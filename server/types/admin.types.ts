import { Types } from "mongoose";

export interface IHomepageAnalytics {
  _id: Types.ObjectId | string;
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  updatedAt?: Date | string;
}

export interface IHomepageConfig {
  _id: Types.ObjectId | string;
  heroBannerTitle?: string;
  heroBannerSubTitle?: string;
  featuredCourseIds?: (Types.ObjectId | string)[];
  todaysPickCourseId?: Types.ObjectId | string;
  updatedAt?: Date | string;
}
