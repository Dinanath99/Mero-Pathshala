import { Types } from "mongoose";

export interface IToolCategory {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type PricingType = "Free" | "Freemium" | "Paid" | "Free Trial";

export interface ITool {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  category: Types.ObjectId | IToolCategory | string;
  iconUrl?: string;
  pricingType: PricingType;
  isFeatured?: boolean;
  rating?: number;
  tags?: string[];
  upvotes?: (Types.ObjectId | string)[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
