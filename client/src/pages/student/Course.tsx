import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useToggleWishlistMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { RootState } from "@/app/store";

interface CourseProps {
  course: any;
}

const Course: React.FC<CourseProps> = ({ course }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [toggleWishlist, { isLoading }] = useToggleWishlistMutation();

  if (!course) return null;

  const isWishlisted = user?.wishlist?.includes(course._id);

  const creatorName =
    typeof course.creator === "object" && course.creator?.name
      ? course.creator.name
      : "AI Guru Instructor";
  const creatorPhoto =
    typeof course.creator === "object" && course.creator?.photoUrl
      ? course.creator.photoUrl
      : "https://avatar.iran.liara.run/public/boy";

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      const res = await toggleWishlist(course._id).unwrap();
      toast.success((res as any)?.message || "Wishlist updated");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update wishlist");
    }
  };

  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative group">
        <div className="relative">
          <img
            src={
              course.courseThumbnail ||
              "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60"
            }
            alt={course.courseTitle || "course"}
            className="w-full h-40 object-cover rounded-t-2xl"
          />
          <button
            onClick={handleWishlist}
            disabled={isLoading}
            className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors z-10 opacity-0 group-hover:opacity-100 sm:opacity-100 shadow-sm"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            />
          </button>
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate dark:text-white">
            {course.courseTitle || "Untitled Course"}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={creatorPhoto} alt={creatorName} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                {creatorName}
              </h1>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 text-xs rounded-full border-none shadow-sm">
              {course.courseLevel || "Beginner"}
            </Badge>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            <span>
              {course.coursePrice ? `₹${course.coursePrice}` : "Free / नि:शुल्क"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
