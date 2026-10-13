import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import {
  initiateCoursePayment,
  verifyEsewaPayment,
  getPaymentStatus,
  handleEsewaFailure,
} from "../controllers/coursePurchase.controller.js";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Enrollment } from "../models/enrollment.model.js";
import { User } from "../models/user.model.js";

const TEST_SECRET = "8gBm/:&EnhH.1/q";
const TEST_PRODUCT = "EPAYTEST";

// Helper to create mock response object
const createMockRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
  return res;
};

test("Course Payment Initiation - Controller Tests", async (t) => {
  await t.test("rejects unauthenticated payment attempt with 401", async () => {
    const req = { id: null, body: { courseId: "64a000000000000000000001" } };
    const res = createMockRes();

    await initiateCoursePayment(req, res);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  await t.test("rejects request missing courseId with 400", async () => {
    const req = { id: "user-123", body: {} };
    const res = createMockRes();

    await initiateCoursePayment(req, res);
    assert.strictEqual(res.statusCode, 400);
    assert.match(res.body.message, /Course ID is required/);
  });

  await t.test("returns 404 if course is not found in MongoDB", async () => {
    const originalFindById = Course.findById;
    const originalUserFindById = User.findById;

    User.findById = async () => ({ _id: "user-1", email: "student@test.com" });
    Course.findById = async () => null;

    try {
      const req = { id: "user-1", body: { courseId: "invalid-id" } };
      const res = createMockRes();

      await initiateCoursePayment(req, res);
      assert.strictEqual(res.statusCode, 404);
      assert.strictEqual(res.body.success, false);
    } finally {
      Course.findById = originalFindById;
      User.findById = originalUserFindById;
    }
  });

  await t.test("prevents duplicate purchase if user is already enrolled", async () => {
    const originalFindById = Course.findById;
    const originalUserFindById = User.findById;
    const originalEnrollmentFindOne = Enrollment.findOne;

    User.findById = async () => ({ _id: "user-1", email: "student@test.com" });
    Course.findById = async () => ({
      _id: "course-1",
      courseTitle: "React Pro",
      coursePrice: 1500,
    });
    // Return existing active enrollment
    Enrollment.findOne = async () => ({ _id: "enr-active", status: "active" });

    try {
      const req = { id: "user-1", body: { courseId: "course-1" } };
      const res = createMockRes();

      await initiateCoursePayment(req, res);
      assert.strictEqual(res.statusCode, 400);
      assert.strictEqual(res.body.isAlreadyEnrolled, true);
    } finally {
      Course.findById = originalFindById;
      User.findById = originalUserFindById;
      Enrollment.findOne = originalEnrollmentFindOne;
    }
  });

  await t.test("directly activates enrollment for free courses without payment", async () => {
    const originalCourseFindById = Course.findById;
    const originalUserFindById = User.findById;
    const originalEnrollmentFindOne = Enrollment.findOne;
    const originalEnrollmentCreate = Enrollment.create;
    const originalPurchaseFindOne = CoursePurchase.findOne;
    const originalUserUpdate = User.findByIdAndUpdate;
    const originalCourseUpdate = Course.findByIdAndUpdate;

    let enrollmentCreated = false;
    User.findById = async () => ({ _id: "user-1", email: "student@test.com" });
    Course.findById = async () => ({
      _id: "course-free",
      courseTitle: "Free Course",
      coursePrice: 0,
    });
    Enrollment.findOne = async () => null;
    CoursePurchase.findOne = async () => null;
    Enrollment.create = async () => {
      enrollmentCreated = true;
      return { _id: "enr-1" };
    };
    User.findByIdAndUpdate = async () => ({});
    Course.findByIdAndUpdate = async () => ({});

    try {
      const req = { id: "user-1", body: { courseId: "course-free" } };
      const res = createMockRes();

      await initiateCoursePayment(req, res);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.isFree, true);
      assert.strictEqual(enrollmentCreated, true);
    } finally {
      Course.findById = originalCourseFindById;
      User.findById = originalUserFindById;
      Enrollment.findOne = originalEnrollmentFindOne;
      Enrollment.create = originalEnrollmentCreate;
      CoursePurchase.findOne = originalPurchaseFindOne;
      User.findByIdAndUpdate = originalUserUpdate;
      Course.findByIdAndUpdate = originalCourseUpdate;
    }
  });

  await t.test("calculates amount strictly from MongoDB price and generates signed eSewa payload", async () => {
    const originalCourseFindById = Course.findById;
    const originalUserFindById = User.findById;
    const originalEnrollmentFindOne = Enrollment.findOne;
    const originalPurchaseFindOne = CoursePurchase.findOne;
    const originalPurchaseCreate = CoursePurchase.create;

    let savedPurchase = null;
    User.findById = async () => ({ _id: "user-1", email: "student@test.com" });
    Course.findById = async () => ({
      _id: "course-paid",
      courseTitle: "MERN Stack Mastery",
      coursePrice: 2000, // MongoDB price is 2000
    });
    Enrollment.findOne = async () => null;
    CoursePurchase.findOne = async () => null;
    CoursePurchase.create = async (doc) => {
      savedPurchase = doc;
      return { _id: "purchase-1", ...doc };
    };

    try {
      // Attacker attempts to manipulate amount from frontend
      const req = {
        id: "user-1",
        body: { courseId: "course-paid", manipulatedPrice: 10 },
      };
      const res = createMockRes();

      await initiateCoursePayment(req, res);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.isFree, false);
      assert.strictEqual(res.body.amount, 2000, "Price must be taken from DB, not frontend");
      assert.strictEqual(savedPurchase.amount, 2000);
      assert.strictEqual(savedPurchase.status, "pending");
      assert.ok(res.body.formData.signature, "eSewa signature must be present");
      assert.strictEqual(res.body.formData.total_amount, "2000");
      assert.strictEqual(res.body.formData.product_code, TEST_PRODUCT);
    } finally {
      Course.findById = originalCourseFindById;
      User.findById = originalUserFindById;
      Enrollment.findOne = originalEnrollmentFindOne;
      CoursePurchase.findOne = originalPurchaseFindOne;
      CoursePurchase.create = originalPurchaseCreate;
    }
  });
});

test("Course Payment Verification - Controller Tests", async (t) => {
  const setupValidEsewaPayload = ({
    status = "COMPLETE",
    total_amount = "2000",
    transaction_uuid = "MP-TEST-123",
    product_code = TEST_PRODUCT,
    transaction_code = "TXN001",
  } = {}) => {
    const decoded = {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names:
        "transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names",
    };
    const fieldList = decoded.signed_field_names.split(",");
    const msg = fieldList.map((f) => `${f}=${decoded[f]}`).join(",");
    decoded.signature = crypto
      .createHmac("sha256", TEST_SECRET)
      .update(msg)
      .digest("base64");

    return Buffer.from(JSON.stringify(decoded)).toString("base64");
  };

  await t.test("rejects unauthenticated verification attempt with 401", async () => {
    const req = { id: null, body: { data: "base64" } };
    const res = createMockRes();

    await verifyEsewaPayment(req, res);
    assert.strictEqual(res.statusCode, 401);
  });

  await t.test("rejects missing data parameter with 400", async () => {
    const req = { id: "user-1", body: {} };
    const res = createMockRes();

    await verifyEsewaPayment(req, res);
    assert.strictEqual(res.statusCode, 400);
  });

  await t.test("rejects tampered or forged signature with 400", async () => {
    const forgedData = Buffer.from(
      JSON.stringify({
        status: "COMPLETE",
        total_amount: "2000",
        transaction_uuid: "MP-TEST-123",
        product_code: TEST_PRODUCT,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "invalid-tampered-signature",
      })
    ).toString("base64");

    const req = { id: "user-1", body: { data: forgedData } };
    const res = createMockRes();

    await verifyEsewaPayment(req, res);
    assert.strictEqual(res.statusCode, 400);
    assert.match(res.body.message, /signature verification failed/i);
  });

  await t.test("rejects mismatched product code with 400", async () => {
    const badProductPayload = setupValidEsewaPayload({
      product_code: "OTHER_MERCHANT_CODE",
    });

    const req = { id: "user-1", body: { data: badProductPayload } };
    const res = createMockRes();

    await verifyEsewaPayment(req, res);
    assert.strictEqual(res.statusCode, 400);
    assert.match(res.body.message, /product code mismatch/i);
  });

  await t.test("returns 404 when transaction UUID is not found in database", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    CoursePurchase.findOne = async () => null;

    try {
      const payload = setupValidEsewaPayload();
      const req = { id: "user-1", body: { data: payload } };
      const res = createMockRes();

      await verifyEsewaPayment(req, res);
      assert.strictEqual(res.statusCode, 404);
      assert.match(res.body.message, /not found/i);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
    }
  });

  await t.test("returns 403 when transaction belongs to another user account", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    CoursePurchase.findOne = async () => ({
      userId: "victim-user-999", // Different user
      transactionUuid: "MP-TEST-123",
      amount: 2000,
      status: "pending",
    });

    try {
      const payload = setupValidEsewaPayload();
      const req = { id: "attacker-user-1", body: { data: payload } };
      const res = createMockRes();

      await verifyEsewaPayment(req, res);
      assert.strictEqual(res.statusCode, 403);
      assert.match(res.body.message, /belongs to another account/i);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
    }
  });

  await t.test("rejects when paid amount does not match original database price", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    CoursePurchase.findOne = async () => ({
      userId: "user-1",
      transactionUuid: "MP-TEST-123",
      amount: 2000, // Expected 2000
      status: "pending",
    });

    try {
      // Attacker managed to pass total_amount 500
      const payload = setupValidEsewaPayload({ total_amount: "500" });
      const req = { id: "user-1", body: { data: payload } };
      const res = createMockRes();

      await verifyEsewaPayment(req, res);
      assert.strictEqual(res.statusCode, 400);
      assert.match(res.body.message, /amount.*does not match/i);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
    }
  });

  await t.test("idempotently handles already completed transactions without side-effects", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    CoursePurchase.findOne = async () => ({
      userId: "user-1",
      transactionUuid: "MP-TEST-123",
      amount: 2000,
      status: "completed", // Already completed
      courseId: "course-1",
      refId: "TXN001",
    });

    try {
      const payload = setupValidEsewaPayload();
      const req = { id: "user-1", body: { data: payload } };
      const res = createMockRes();

      await verifyEsewaPayment(req, res);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.alreadyVerified, true);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
    }
  });

  await t.test("verifies successful payment and grants course enrollment", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    const originalUserFindById = User.findById;
    const originalEnrollmentFindOne = Enrollment.findOne;
    const originalEnrollmentCreate = Enrollment.create;
    const originalUserUpdate = User.findByIdAndUpdate;
    const originalCourseUpdate = Course.findByIdAndUpdate;
    const originalFetch = globalThis.fetch;

    let purchaseSaved = false;
    let enrollmentCreated = false;

    const mockPurchase = {
      userId: "user-1",
      courseId: "course-1",
      transactionUuid: "MP-TEST-123",
      amount: 2000,
      status: "pending",
      refId: null,
      save: async () => {
        purchaseSaved = true;
      },
    };

    CoursePurchase.findOne = async () => mockPurchase;
    User.findById = async () => ({
      _id: "user-1",
      email: "student@meropathsala.com",
    });
    Enrollment.findOne = async () => null;
    Enrollment.create = async () => {
      enrollmentCreated = true;
      return { _id: "enr-new" };
    };
    User.findByIdAndUpdate = async () => ({});
    Course.findByIdAndUpdate = async () => ({});

    // Mock server-to-server status check returning COMPLETE
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({
        pid: "MP-TEST-123",
        scd: TEST_PRODUCT,
        totalAmount: 2000,
        status: "COMPLETE",
        refId: "ESEWA-SERVER-REF",
      }),
    });

    try {
      const payload = setupValidEsewaPayload();
      const req = { id: "user-1", body: { data: payload } };
      const res = createMockRes();

      await verifyEsewaPayment(req, res);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(purchaseSaved, true);
      assert.strictEqual(mockPurchase.status, "completed");
      assert.strictEqual(enrollmentCreated, true);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
      User.findById = originalUserFindById;
      Enrollment.findOne = originalEnrollmentFindOne;
      Enrollment.create = originalEnrollmentCreate;
      User.findByIdAndUpdate = originalUserUpdate;
      Course.findByIdAndUpdate = originalCourseUpdate;
      globalThis.fetch = originalFetch;
    }
  });
});

test("Payment Status & Failure Handlers", async (t) => {
  await t.test("retrieves status for authenticated user", async () => {
    const originalPurchaseFindOne = CoursePurchase.findOne;
    const originalUserFindById = User.findById;
    const originalEnrollmentFindOne = Enrollment.findOne;

    CoursePurchase.findOne = () => ({
      populate: async () => ({
        transactionUuid: "MP-TXN-1",
        amount: 1000,
        status: "completed",
        courseId: { _id: "c-1", courseTitle: "Test Course" },
      }),
    });
    User.findById = async () => ({ email: "test@user.com" });
    Enrollment.findOne = async () => ({ status: "active" });

    try {
      const req = { id: "user-1", params: { transactionUuid: "MP-TXN-1" } };
      const res = createMockRes();

      await getPaymentStatus(req, res);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.isEnrolled, true);
    } finally {
      CoursePurchase.findOne = originalPurchaseFindOne;
      User.findById = originalUserFindById;
      Enrollment.findOne = originalEnrollmentFindOne;
    }
  });

  await t.test("records cancellation by updating pending status to failed", async () => {
    const originalFindOneAndUpdate = CoursePurchase.findOneAndUpdate;
    let updatedFilter = null;
    let updateFields = null;

    CoursePurchase.findOneAndUpdate = async (filter, update) => {
      updatedFilter = filter;
      updateFields = update;
      return {};
    };

    try {
      const req = {
        id: "user-1",
        body: { transactionUuid: "MP-TXN-CANCEL" },
      };
      const res = createMockRes();

      await handleEsewaFailure(req, res);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(updatedFilter.transactionUuid, "MP-TXN-CANCEL");
      assert.strictEqual(updatedFilter.status, "pending");
      assert.strictEqual(updateFields.status, "failed");
    } finally {
      CoursePurchase.findOneAndUpdate = originalFindOneAndUpdate;
    }
  });
});

