import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./Course";
import { API_BASE_URL } from "@/config/api";
import { Sparkles, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE_URL}/recommendations/recommend`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setRecommendedCourses(res.data.recommendedCourses);
      } else {
        toast.error("No recommendations found.");
      }
    } catch (err) {
      toast.error("Failed to fetch recommended courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Jodne Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-[#FF5533]">
            <Sparkles className="w-3.5 h-3.5" /> AI SMART RECOMMENDATIONS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Curated Courses For You
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Tailored learning suggestions based on your personal profile, interests, and skill matrix.
          </p>
        </div>

        {/* Course Grid or Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : recommendedCourses.length === 0 ? (
          <div className="bg-card dark:bg-[#151821] rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#FF5533] flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Recommendations Yet</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Update your skills and interests in your profile to enable personalized course suggestions.
            </p>
            <Link to="/profile" className="inline-block pt-2">
              <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold shadow-md px-6">
                Update Profile Settings →
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;

