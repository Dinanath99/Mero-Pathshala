import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields including role are required.",
      });
    }

    if (!["student", "instructor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields including role are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    if (user.role && user.role !== role) {
      return res.status(400).json({
        success: false,
        message: "Role mismatch for this user",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password || "");
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    return generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetUserProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const {
      name,
      skills,
      interests,
      experienceLevel,
      preferredRoles,
      jobTitle,
      educationLevel,
    } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updatedData: Record<string, any> = {};

    if (name) updatedData.name = name;

    if (skills) {
      updatedData.skills = typeof skills === "string"
        ? skills.split(",").map((s: string) => s.trim())
        : skills;
    }

    if (interests) {
      updatedData.interests = typeof interests === "string"
        ? interests.split(",").map((i: string) => i.trim())
        : interests;
    }

    if (experienceLevel) updatedData.experienceLevel = experienceLevel;

    if (preferredRoles) {
      updatedData.preferredRoles = typeof preferredRoles === "string"
        ? preferredRoles.split(",").map((r: string) => r.trim())
        : preferredRoles;
    }

    if (jobTitle) updatedData.jobTitle = jobTitle;
    if (educationLevel) updatedData.educationLevel = educationLevel;

    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop()?.split(".")[0];
        if (publicId) {
          await deleteMediaFromCloudinary(publicId);
        }
      }
      const cloudResponse = await uploadMedia(profilePhoto.path);
      if (cloudResponse?.secure_url) {
        updatedData.photoUrl = cloudResponse.secure_url;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

export const toggleWishlist = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isWishlisted = user.wishlist.some(
      (id) => id.toString() === courseId
    );

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== courseId) as any;
    } else {
      user.wishlist.push(courseId as any);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return res.status(500).json({ success: false, message: "Failed to update wishlist" });
  }
};
