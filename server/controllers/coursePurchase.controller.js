import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Enrollment } from "../models/enrollment.model.js";
import { User } from "../models/user.model.js";
import {
  ESEWA_SANDBOX_PRODUCT_CODE,
  buildEsewaPaymentPayload,
  decodeBase64ResponseData,
  validateEsewaSandboxConfig,
  verifyEsewaResponseSignature,
  verifyEsewaTransactionStatus,
} from "../services/esewa.service.js";
import { hasActiveEnrollment } from "../services/enrollment.service.js";

/**
 * Fetch course details with enrollment/purchase status for a student.
 */
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    let userId = req.id;
    let userEmail = "";

    if (!userId && req.cookies?.token) {
      try {
        const decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        userId = decode?.userId;
      } catch (e) {
        // Guest or expired token
      }
    }

    if (userId) {
      const user = await User.findById(userId);
      if (user) userEmail = user.email;
    }

    const course = await Course.findById(courseId)
      .populate({ path: "creator", select: "name photoUrl jobTitle" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const purchased = await hasActiveEnrollment(userId, userEmail, courseId);

    return res.status(200).json({
      course,
      purchased,
    });
  } catch (error) {
    console.error("Get course detail error:", error);
    return res.status(500).json({ message: "Failed to fetch course detail" });
  }
};

/**
 * Fetch all completed course purchases (Admin / Instructor).
 */
export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || [],
    });
  } catch (error) {
    console.error("Get all purchased courses error:", error);
    return res.status(500).json({ message: "Failed to fetch purchased courses" });
  }
};

/**
 * Initiates enrollment or payment for a course.
 * Authenticated endpoint.
 *
 * Flow:
 * 1. Checks if course exists in MongoDB.
 * 2. Fetches current price strictly from MongoDB (never frontend).
 * 3. Checks if user is already actively enrolled to prevent duplicate purchases.
 * 4. If free (price <= 0), directly activates enrollment without payment gateway.
 * 5. If paid, creates pending payment record with unique transaction UUID and generates eSewa signed payload.
 */
export const initiateCoursePayment = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to enroll in courses.",
      });
    }

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Check for existing active enrollment
    const isEnrolled = await hasActiveEnrollment(user._id, user.email, courseId);
    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        isAlreadyEnrolled: true,
        message: "You are already actively enrolled in this course.",
      });
    }

    // Free course handling: price is 0, null, or undefined
    const coursePrice = Number(course.coursePrice) || 0;
    if (coursePrice <= 0) {
      // Create or ensure active enrollment
      let enrollment = await Enrollment.findOne({
        courseId: course._id,
        $or: [{ userId: user._id }, { studentEmail: user.email.toLowerCase() }],
        status: "active",
      });

      if (!enrollment) {
        enrollment = await Enrollment.create({
          userId: user._id,
          studentEmail: user.email.toLowerCase(),
          courseId: course._id,
          status: "active",
          source: "free_enrollment",
          enrolledAt: new Date(),
        });
      }

      await User.findByIdAndUpdate(user._id, {
        $addToSet: { enrolledCourses: course._id },
      });
      await Course.findByIdAndUpdate(course._id, {
        $addToSet: { enrolledStudents: user._id },
      });

      return res.status(200).json({
        success: true,
        isFree: true,
        message: "Successfully enrolled in free course.",
        courseId: course._id,
      });
    }

    // Paid course: Generate unique transaction UUID (alphanumeric and hyphens only)
    const randomHex = crypto.randomBytes(4).toString("hex");
    const timestamp = Date.now();
    const transactionUuid = `MP-${timestamp}-${randomHex}`;

    // Create a pending payment record
    const pendingPurchase = await CoursePurchase.create({
      courseId: course._id,
      userId: user._id,
      amount: coursePrice,
      status: "pending",
      paymentId: transactionUuid,
      transactionUuid,
      paymentMethod: "esewa",
    });

    // Build eSewa ePay V2 signed payload
    const paymentPayload = buildEsewaPaymentPayload({
      amount: coursePrice,
      transactionUuid,
    });

    return res.status(200).json({
      success: true,
      isFree: false,
      gatewayUrl: paymentPayload.gatewayUrl,
      formData: paymentPayload.formData,
      purchaseId: pendingPurchase._id,
      transactionUuid,
      amount: coursePrice,
    });
  } catch (error) {
    console.error("Initiate course payment error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to initiate payment session",
    });
  }
};

/**
 * Verifies eSewa payment response and confirms course enrollment.
 * Authenticated endpoint.
 *
 * Security requirements:
 * 1. Decode Base64 safely.
 * 2. Cryptographic signature check with merchant secret key.
 * 3. Validate product code, transaction UUID, status COMPLETE, and expected amount against database record.
 * 4. Verify transaction ownership belongs to the authenticated user.
 * 5. Perform server-to-server transaction-status verification API call.
 * 6. Idempotently update payment record and activate enrollment.
 */
export const verifyEsewaPayment = async (req, res) => {
  try {
    const userId = req.id;
    const { data } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "eSewa response data parameter is required.",
      });
    }

    // Step 1: Decode Base64 response
    let decodedData;
    try {
      decodedData = decodeBase64ResponseData(data);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Malformed eSewa response data.",
      });
    }

    const {
      status,
      signature,
      signed_field_names,
      total_amount,
      transaction_uuid,
      product_code,
      transaction_code,
    } = decodedData;

    if (!transaction_uuid) {
      return res.status(400).json({
        success: false,
        message: "Missing transaction_uuid in response payload.",
      });
    }

    // Step 2: Validate cryptographic response signature
    const isValidSignature = verifyEsewaResponseSignature({ decodedData });
    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: "Payment response signature verification failed. Possible payload tampering.",
      });
    }

    // Step 2b: Validate sandbox configuration
    try {
      validateEsewaSandboxConfig();
    } catch (configErr) {
      return res.status(500).json({
        success: false,
        message: configErr.message,
      });
    }

    // Step 3: Validate merchant product code strictly against sandbox
    const expectedProductCode = ESEWA_SANDBOX_PRODUCT_CODE;
    if (product_code && product_code.trim() !== expectedProductCode) {
      return res.status(400).json({
        success: false,
        message: "Merchant product code mismatch. Only sandbox transactions are permitted.",
      });
    }

    // Step 4: Find pending payment record in DB
    const purchase = await CoursePurchase.findOne({
      transactionUuid: transaction_uuid,
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Payment record for this transaction UUID was not found.",
      });
    }

    // Step 5: Verify transaction ownership matches authenticated user
    if (purchase.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Payment transaction belongs to another account.",
      });
    }

    // Step 6: Validate amount matches original database price
    const returnedAmount = Number(String(total_amount).replace(/,/g, ""));
    if (returnedAmount !== Number(purchase.amount)) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (${returnedAmount}) does not match expected course price (${purchase.amount}).`,
      });
    }

    // Step 7: Check idempotency - if already completed, do not duplicate actions
    if (purchase.status === "completed") {
      return res.status(200).json({
        success: true,
        alreadyVerified: true,
        message: "Payment has already been verified and course enrollment is active.",
        courseId: purchase.courseId,
        transactionCode: purchase.refId || transaction_code,
      });
    }

    // Step 8: Check status returned in payload is COMPLETE
    if (status !== "COMPLETE") {
      purchase.status = "failed";
      await purchase.save();
      return res.status(400).json({
        success: false,
        message: `Payment is not completed. Current status: ${status}`,
      });
    }

    // Step 9: Server-to-Server Status Verification
    const verificationResult = await verifyEsewaTransactionStatus({
      productCode: expectedProductCode,
      totalAmount: purchase.amount,
      transactionUuid: transaction_uuid,
    });

    if (!verificationResult.isVerified) {
      return res.status(400).json({
        success: false,
        message: `Server-to-server transaction status verification failed. Provider status: ${verificationResult.status}`,
        details: verificationResult.status,
      });
    }

    // Step 10: Atomic and idempotent database updates
    const user = await User.findById(purchase.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account associated with this purchase was not found.",
      });
    }

    purchase.status = "completed";
    purchase.refId = transaction_code || verificationResult.refId;
    purchase.rawVerificationResponse = {
      decodedData,
      verificationResult,
    };
    await purchase.save();

    // Create or activate Enrollment record
    let enrollment = await Enrollment.findOne({
      courseId: purchase.courseId,
      studentEmail: user.email.toLowerCase(),
      status: "active",
    });

    if (!enrollment) {
      enrollment = await Enrollment.create({
        userId: user._id,
        studentEmail: user.email.toLowerCase(),
        courseId: purchase.courseId,
        status: "active",
        source: "esewa",
        enrolledAt: new Date(),
      });
    } else if (!enrollment.userId) {
      enrollment.userId = user._id;
      await enrollment.save();
    }

    // Add course to user's enrolledCourses
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: purchase.courseId },
    });

    // Add student to course's enrolledStudents
    await Course.findByIdAndUpdate(purchase.courseId, {
      $addToSet: { enrolledStudents: user._id },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully. Course enrollment activated.",
      courseId: purchase.courseId,
      transactionCode: purchase.refId,
    });
  } catch (error) {
    console.error("Verify eSewa payment error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to verify eSewa payment",
    });
  }
};

/**
 * Retrieve transaction and enrollment status by transaction UUID.
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const userId = req.id;
    const { transactionUuid } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const purchase = await CoursePurchase.findOne({
      transactionUuid,
      userId,
    }).populate("courseId", "courseTitle coursePrice courseThumbnail");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Payment transaction not found.",
      });
    }

    const user = await User.findById(userId);
    const isEnrolled = await hasActiveEnrollment(
      userId,
      user?.email,
      purchase.courseId?._id
    );

    return res.status(200).json({
      success: true,
      purchase,
      isEnrolled,
    });
  } catch (error) {
    console.error("Get payment status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve payment status",
    });
  }
};

/**
 * Handles browser redirect from eSewa callback.
 * If eSewa redirects directly to backend, forwards to client success page.
 */
export const handleEsewaCallback = async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const data = req.query.data || "";
  return res.redirect(`${clientUrl}/payment/esewa/success?data=${encodeURIComponent(data)}`);
};

/**
 * Records payment failure or user cancellation.
 */
export const handleEsewaFailure = async (req, res) => {
  try {
    const userId = req.id;
    const { transactionUuid } = req.body;

    if (transactionUuid && userId) {
      await CoursePurchase.findOneAndUpdate(
        { transactionUuid, userId, status: "pending" },
        { status: "failed" }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Payment cancellation acknowledged.",
    });
  } catch (error) {
    console.error("Handle payment failure error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to record payment cancellation.",
    });
  }
};
