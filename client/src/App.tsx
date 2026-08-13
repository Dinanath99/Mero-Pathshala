import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";

// Layout & Core Components
import MainLayout from "./layout/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/ThemeProvider";
import Footer from "./components/Footer";

// Route Guards
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

// Public Pages (Home is statically imported for instant FCP)
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import AboutUs from "./components/AboutUs";

// Lazy Loaded Auth
const Login = lazy(() => import("./pages/Login"));

// Lazy Loaded Student & Public Content Pages
const MyLearning = lazy(() => import("./pages/student/MyLearning"));
const Profile = lazy(() => import("./pages/student/Profile"));
const CourseDetail = lazy(() => import("./pages/student/CourseDetail"));
const CourseProgress = lazy(() => import("./pages/student/CourseProgress"));
const SearchPage = lazy(() => import("./pages/student/SearchPage"));
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentNotesPage = lazy(() => import("./pages/student/StudentNotesPage"));
const StudentBookmarksPage = lazy(() => import("./pages/student/StudentBookmarksPage"));
const StudentNotificationsPage = lazy(() => import("./pages/student/StudentNotificationsPage"));

// Lazy Loaded Career & CV Tools
const CVMaker = lazy(() => import("./pages/student/CVMaker"));
const MyCVs = lazy(() => import("./pages/student/MyCVs"));

// Lazy Loaded Blogs
const BlogList = lazy(() => import("./pages/content/blogs/BlogList"));
const BlogDetail = lazy(() => import("./pages/content/blogs/BlogDetail"));
const CategoryDetail = lazy(() => import("./pages/content/blogs/CategoryDetail"));

// Lazy Loaded AI Tools
const ToolList = lazy(() => import("./pages/content/tools/ToolList"));
const ToolDetail = lazy(() => import("./pages/content/tools/ToolDetail"));

// Lazy Loaded Prompt Library
const PromptList = lazy(() => import("./pages/content/prompts/PromptList"));
const PromptDetail = lazy(() => import("./pages/content/prompts/PromptDetail"));
const PromptCategoryDetail = lazy(() => import("./pages/content/prompts/PromptCategoryDetail"));

// Lazy Loaded AI News
const NewsList = lazy(() => import("./pages/content/news/NewsList"));
const NewsDetail = lazy(() => import("./pages/content/news/NewsDetail"));
const NewsCategoryDetail = lazy(() => import("./pages/content/news/NewsCategoryDetail"));

// Lazy Loaded Learning Hub & Roadmaps
const AIBasics = lazy(() => import("./pages/learn/AIBasics"));
const AIBasicsLesson = lazy(() => import("./pages/learn/AIBasicsLesson"));
const LearningPathHub = lazy(() => import("./pages/learn/LearningPathHub"));
const LearningPathLesson = lazy(() => import("./pages/learn/LearningPathLesson"));
const ComputerFundamentalsHub = lazy(() => import("./pages/learn/ComputerFundamentalsHub"));
const ComputerSkillsModuleDetail = lazy(() => import("./pages/learn/ComputerSkillsModuleDetail"));
const ComputerFundamentalsLesson = lazy(() => import("./pages/learn/ComputerFundamentalsLesson"));
const RoadmapsLandingPage = lazy(() => import("./pages/roadmaps/RoadmapsLandingPage"));
const RoadmapDetailPage = lazy(() => import("./pages/roadmaps/RoadmapDetailPage"));
const MyRoadmapsPage = lazy(() => import("./pages/roadmaps/MyRoadmapsPage"));

// Lazy Loaded Instructor Pages
const BecomeInstructor = lazy(() => import("./pages/instructor/BecomeInstructor"));
const InstructorApplicationForm = lazy(() => import("./pages/instructor/InstructorApplicationForm"));
const InstructorList = lazy(() => import("./pages/instructor/InstructorList"));
const InstructorProfileDetail = lazy(() => import("./pages/instructor/InstructorProfileDetail"));
const InstructorStudents = lazy(() => import("./pages/instructor/dashboard/InstructorStudents"));
const InstructorAnalytics = lazy(() => import("./pages/instructor/dashboard/InstructorAnalytics"));
const InstructorProfileEdit = lazy(() => import("./pages/instructor/dashboard/InstructorProfileEdit"));
const InstructorResources = lazy(() => import("./pages/instructor/dashboard/InstructorResources"));

// Lazy Loaded Admin Pages
const Sidebar = lazy(() => import("./pages/admin/Sidebar"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const CourseTable = lazy(() => import("./pages/admin/course/CourseTable"));
const AddCourse = lazy(() => import("./pages/admin/course/AddCourse"));
const EditCourse = lazy(() => import("./pages/admin/course/EditCourse"));
const CreateLecture = lazy(() => import("./pages/admin/lecture/CreateLecture"));
const EditLecture = lazy(() => import("./pages/admin/lecture/EditLecture"));
const BlogManagement = lazy(() => import("./pages/admin/blog/BlogManagement"));
const CategoryManagement = lazy(() => import("./pages/admin/blog/CategoryManagement"));
const CreateEditBlog = lazy(() => import("./pages/admin/blog/CreateEditBlog"));
const ToolManagement = lazy(() => import("./pages/admin/tool/ToolManagement"));
const CreateEditTool = lazy(() => import("./pages/admin/tool/CreateEditTool"));
const ToolCategoryManagement = lazy(() => import("./pages/admin/tool/ToolCategoryManagement"));
const PromptManagement = lazy(() => import("./pages/admin/prompt/PromptManagement"));
const CreateEditPrompt = lazy(() => import("./pages/admin/prompt/CreateEditPrompt"));
const PromptCategoryManagement = lazy(() => import("./pages/admin/prompt/PromptCategoryManagement"));
const NewsManagement = lazy(() => import("./pages/admin/news/NewsManagement"));
const CreateEditNews = lazy(() => import("./pages/admin/news/CreateEditNews"));
const NewsCategoryManagement = lazy(() => import("./pages/admin/news/NewsCategoryManagement"));
const AdminInstructorApplications = lazy(() => import("./pages/admin/instructor/AdminInstructorApplications"));
const AdminInstructorList = lazy(() => import("./pages/admin/instructor/AdminInstructorList"));
const AdminRoadmapsPage = lazy(() => import("./pages/admin/roadmap/AdminRoadmapsPage"));
const AdminHomepageCMS = lazy(() => import("./pages/admin/homepage/AdminHomepageCMS"));
const AdminHomepageAnalytics = lazy(() => import("./pages/admin/homepage/AdminHomepageAnalytics"));

// Error Pages
const NotFoundPage = lazy(() => import("./pages/error/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("./pages/error/UnauthorizedPage"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,

    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetail />,
      },
      {
        path: "blogs/category/:slug",
        element: <CategoryDetail />,
      },
      {
        path: "ai-tools",
        element: <ToolList />,
      },
      {
        path: "ai-tools/:slug",
        element: <ToolDetail />,
      },
      {
        path: "prompts",
        element: <PromptList />,
      },
      {
        path: "prompt-library",
        element: <PromptList />,
      },
      {
        path: "prompts/:slug",
        element: <PromptDetail />,
      },
      {
        path: "prompts/category/:slug",
        element: <PromptCategoryDetail />,
      },
      {
        path: "learn",
        element: <AIBasics />,
      },
      {
        path: "learn-ai",
        element: <AIBasics />,
      },
      {
        path: "learning-roadmap",
        element: <RoadmapsLandingPage />,
      },
      {
        path: "roadmaps",
        element: <RoadmapsLandingPage />,
      },
      {
        path: "roadmaps/:slug",
        element: <RoadmapDetailPage />,
      },
      {
        path: "my-roadmaps",
        element: <MyRoadmapsPage />,
      },
      {
        path: "free-tutorials",
        element: <AIBasics />,
      },
      {
        path: "learn/ai-basics",
        element: <AIBasics />,
      },
      {
        path: "learn/ai-basics/:slug",
        element: <AIBasicsLesson />,
      },
      {
        path: "learn/computer-skills",
        element: <ComputerFundamentalsHub />,
      },
      {
        path: "learn/computer-skills/module/:moduleId",
        element: <ComputerSkillsModuleDetail />,
      },
      {
        path: "learn/computer-skills/:slug",
        element: <ComputerFundamentalsLesson />,
      },
      {
        path: "learn/computer-fundamentals",
        element: <ComputerFundamentalsHub />,
      },
      {
        path: "learn/computer-fundamentals/module/:moduleId",
        element: <ComputerSkillsModuleDetail />,
      },
      {
        path: "learn/computer-fundamentals/:slug",
        element: <ComputerFundamentalsLesson />,
      },
      {
        path: "learn/digital-skills",
        element: <ComputerFundamentalsHub />,
      },
      {
        path: "learn/path/:pathId",
        element: <LearningPathHub />,
      },
      {
        path: "learn/path/:pathId/module/:moduleSlug",
        element: <LearningPathLesson />,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: <SearchPage />,
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "my-notes",
        element: (
          <ProtectedRoute>
            <StudentNotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookmarks",
        element: (
          <ProtectedRoute>
            <StudentBookmarksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <StudentNotificationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cv-builder",
        element: <CVMaker />,
      },
      {
        path: "cv-builder/:cvId",
        element: <CVMaker />,
      },
      {
        path: "free-cv-builder",
        element: <CVMaker />,
      },
      {
        path: "my-cvs",
        element: (
          <ProtectedRoute>
            <MyCVs />
          </ProtectedRoute>
        ),
      },

      // Admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "roadmaps",
            element: <AdminRoadmapsPage />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
          {
            path: "blog",
            element: <BlogManagement />,
          },
          {
            path: "blog/create",
            element: <CreateEditBlog />,
          },
          {
            path: "blog/:blogId",
            element: <CreateEditBlog />,
          },
          {
            path: "categories",
            element: <CategoryManagement />,
          },
          {
            path: "tools",
            element: <ToolManagement />,
          },
          {
            path: "tools/create",
            element: <CreateEditTool />,
          },
          {
            path: "tools/:toolId",
            element: <CreateEditTool />,
          },
          {
            path: "tool-categories",
            element: <ToolCategoryManagement />,
          },
          {
            path: "prompts",
            element: <PromptManagement />,
          },
          {
            path: "prompts/create",
            element: <CreateEditPrompt />,
          },
          {
            path: "prompts/:promptId",
            element: <CreateEditPrompt />,
          },
          {
            path: "prompt-categories",
            element: <PromptCategoryManagement />,
          },
          {
            path: "news",
            element: <NewsManagement />,
          },
          {
            path: "news/create",
            element: <CreateEditNews />,
          },
          {
            path: "news/:newsId",
            element: <CreateEditNews />,
          },
          {
            path: "news-categories",
            element: <NewsCategoryManagement />,
          },
          {
            path: "instructors/applications",
            element: <AdminInstructorApplications />,
          },
          {
            path: "instructors",
            element: <AdminInstructorList />,
          },
          {
            path: "instructor-students",
            element: <InstructorStudents />,
          },
          {
            path: "instructor-analytics",
            element: <InstructorAnalytics />,
          },
          {
            path: "instructor-profile",
            element: <InstructorProfileEdit />,
          },
          {
            path: "instructor-resources",
            element: <InstructorResources />,
          },
          {
            path: "homepage-cms",
            element: <AdminHomepageCMS />,
          },
          {
            path: "homepage-analytics",
            element: <AdminHomepageAnalytics />,
          },
        ],
      },
      {
        path: "become-an-instructor",
        element: <BecomeInstructor />,
      },
      {
        path: "become-an-instructor/apply",
        element: <InstructorApplicationForm />,
      },
      {
        path: "instructors",
        element: <InstructorList />,
      },
      {
        path: "instructors/:slug",
        element: <InstructorProfileDetail />,
      },
      {
        path: "news",
        element: <NewsList />,
      },
      {
        path: "ai-news",
        element: <NewsList />,
      },
      {
        path: "news/:slug",
        element: <NewsDetail />,
      },
      {
        path: "news/category/:slug",
        element: <NewsCategoryDetail />,
      },
      {
        path: "news/tag/:slug",
        element: <NewsList />,
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ErrorBoundary>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={appRouter} />
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </main>
  );
}

export default App;
