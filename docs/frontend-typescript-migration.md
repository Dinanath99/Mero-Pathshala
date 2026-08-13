# AI Guru Nepal — Frontend TypeScript Migration Plan & Audit Report

## 1. Current Frontend Architecture
- **Build Tool & Runtime:** Vite + React 18 (ESNext target, React Router v6)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`) + RTK Query (`createApi`, `fetchBaseQuery`)
- **UI Architecture:** Tailwind CSS, Radix UI primitives (`@radix-ui`), Framer Motion, Lucide React icons, Sonner toasts
- **Routing & Auth:** React Router DOM v6 with `ProtectedRoutes` and role-based route access controls (Student, Instructor, Admin)

## 2. File Inventory & Audit Metrics
- **`.js` Files:** 18
  - `src/app/store.js`
  - `src/app/rootRedcuer.js`
  - `src/features/authSlice.js`
  - `src/features/api/*` (11 RTK Query API service files)
  - `src/lib/utils.js`
  - `src/pages/learn/aiBasicsData.js`
  - `src/pages/learn/learningPathsData.js`
- **`.jsx` Files:** 124
  - `src/App.jsx`, `src/main.jsx`, `src/DarkMode.jsx`, `src/layout/MainLayout.jsx`
  - Components: Core components, lesson callouts, comments, UI primitives (Radix wrappers), homepage widgets
  - Pages: Student, Instructor, Admin, Learning Hub, Roadmaps, News, Blogs, AI Tools, Prompt Library
- **Existing `.ts` Files:** 4 (`api.types.ts`, `course.types.ts`, `user.types.ts`, `index.ts`)
- **Existing `.tsx` Files:** 0
- **Total Frontend Files to Migrate:** 142

## 3. Type Architecture Strategy (`src/types/`)
We will organize type definitions in `src/types/`:
- `user.types.ts` (User, UserRole, UserProfile)
- `auth.types.ts` (LoginRequest, RegisterRequest, AuthState)
- `course.types.ts` (Course, Lecture, Category, FilterOptions)
- `lecture.types.ts` (Lecture, Quiz, Resource)
- `progress.types.ts` (CourseProgress, LectureProgress)
- `blog.types.ts` (Blog, BlogCategory, BlogComment)
- `ai-tool.types.ts` (Tool, ToolCategory, PricingTier, QuizQuestion)
- `prompt.types.ts` (Prompt, PromptCategory, PromptBreakdown)
- `news.types.ts` (NewsArticle, NewsCategory, NewsTag)
- `roadmap.types.ts` (Roadmap, RoadmapNode, RoadmapAdvisor)
- `instructor.types.ts` (InstructorApplication, InstructorProfile, InstructorStats)
- `notification.types.ts` (NotificationItem, LearningActivity, BookmarkItem, LearningNote)
- `recommendation.types.ts` (RecommendationCourse, RecommendationScore)
- `api.types.ts` (Generic `ApiResponse<T>`, PaginatedResponse<T>, ErrorResponse)
- `common.types.ts` (UI component props, form events, pagination parameters)

## 4. Migration Roadmap
1. **Phase 2:** TypeScript configuration verification (`tsconfig.json` & `tsconfig.node.json`)
2. **Phase 3:** Comprehensive Type Architecture (`src/types/*.types.ts`)
3. **Phase 4:** API & Service Layer (RTK Query APIs: `authApi`, `courseApi`, `blogApi`, etc. `.js` → `.ts`)
4. **Phase 5:** Redux Store & Auth Slice (`store.ts`, `authSlice.ts`, `rootReducer.ts`)
5. **Phase 6:** Shared UI Primitives & Components (`components/ui/*.jsx` → `.tsx`, `Navbar`, `Footer`, `SEO`, etc.)
6. **Phase 7:** Core & Content Pages (Home, Auth, Student, Learning, Content, Instructor, Admin pages `.jsx` → `.tsx`)
7. **Phase 8:** Custom Hooks & Contexts
8. **Phase 9:** Verification & Type Check (`npx tsc --noEmit`)
9. **Phase 10:** Production Build Verification (`npm run build`)
