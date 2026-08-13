import { Request, Response } from "express";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created.",
    });
  } catch (error) {
    console.error("createCourse error:", error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const searchCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;

    const searchCriteria: Record<string, any> = {
      isPublished: true,
    };

    const searchQueryStr = typeof query === "string" ? query.trim() : "";
    if (searchQueryStr) {
      searchCriteria.$or = [
        { courseTitle: { $regex: searchQueryStr, $options: "i" } },
        { subTitle: { $regex: searchQueryStr, $options: "i" } },
        { category: { $regex: searchQueryStr, $options: "i" } },
      ];
    }

    const categoriesArray = Array.isArray(categories)
      ? categories
      : typeof categories === "string" && categories
      ? [categories]
      : [];

    if (categoriesArray.length > 0) {
      searchCriteria.category = { $in: categoriesArray };
    }

    const sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1;
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }

    const pageNum = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [courses, total] = await Promise.all([
      Course.find(searchCriteria)
        .populate({ path: "creator", select: "name photoUrl" })
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Course.countDocuments(searchCriteria),
    ]);

    return res.status(200).json({
      success: true,
      courses: courses || [],
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("searchCourse error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search courses",
      courses: [],
    });
  }
};

export const getPublishedCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pageNum = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limitParam = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const limitNum = limitParam ? Math.min(100, Math.max(1, limitParam)) : 24;
    const skip = (pageNum - 1) * limitNum;

    const [courses, total] = await Promise.all([
      Course.find({ isPublished: true })
        .populate({
          path: "creator",
          select: "name photoUrl",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Course.countDocuments({ isPublished: true }),
    ]);

    return res.status(200).json({
      success: true,
      courses: courses || [],
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("getPublishedCourse error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get published courses",
      courses: [],
    });
  }
};

export const getCreatorCourses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.error("getCreatorCourses error:", error);
    return res.status(500).json({
      message: "Failed to get creator courses",
    });
  }
};

export const editCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop()?.split(".")[0];
        if (publicId) {
          await deleteMediaFromCloudinary(publicId);
        }
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData: Record<string, any> = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    };
    if (courseThumbnail?.secure_url) {
      updateData.courseThumbnail = courseThumbnail.secure_url;
    }

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.error("editCourse error:", error);
    return res.status(500).json({
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const courseId = req.params.courseId as string;
    if (!courseId || typeof courseId !== "string" || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("getCourseById error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get course by id",
    });
  }
};

export const createLecture = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id as any);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully.",
    });
  } catch (error) {
    console.error("createLecture error:", error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.error("getCourseLecture error:", error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const editLecture = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id as any)) {
      course.lectures.push(lecture._id as any);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.error("editLecture error:", error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};

export const removeLecture = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.error("removeLecture error:", error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.error("getLectureById error:", error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};

export const togglePublishCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.error("togglePublishCourse error:", error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};
