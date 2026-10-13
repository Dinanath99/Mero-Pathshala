# Mero Pathsala — Marketplace Evolution Plan & Architecture Strategy

## 1. Executive Summary

This document establishes the roadmap for evolving **Mero Pathsala** from a single-instructor LMS into a **two-sided Nepali learning marketplace**. The evolution preserves 100% of existing authentication, course management, video progress tracking, AI recommendations, and Stripe payment flows while introducing:

1. **Instructor Onboarding & Governance**: Student application flow, admin approval/rejection, and verified instructor badges.
2. **Course Quality Moderation**: Moderation status lifecycle (`DRAFT`, `PENDING_REVIEW`, `APPROVED`, `REJECTED`).
3. **Strict Course Ownership & Authorization**: Backend validation ensuring creators can only edit their own content.
4. **Trust & Social Proof**: Course review and rating engine restricted to verified students.
5. **Marketplace Revenue Split**: Server-side revenue ledger calculating platform fee vs. instructor earnings per transaction.
6. **Public Instructor Portfolios**: Public profile pages showcasing instructor bios, verified badges, ratings, and course catalogs.

---

## 2. Current Architecture vs. Marketplace Gap Analysis

### Architecture Audit Findings

- **Authentication & Auth State**: Uses JWT stored in HTTP-Only cookies (`token`). User roles currently include `"student"` and `"instructor"`.
- **Database Schemas**:
  - `User`: Basic fields (`name`, `email`, `role`, `skills`, `interests`, `enrolledCourses`, `photoUrl`, `preferredRoles`, `jobTitle`, `educationLevel`).
  - `Course`: Basic fields (`courseTitle`, `subTitle`, `description`, `category`, `courseLevel`, `coursePrice`, `courseThumbnail`, `enrolledStudents`, `lectures`, `creator`, `isPublished`, `tags`).
  - `Lecture`: `lectureTitle`, `videoUrl`, `publicId`, `isPreviewFree`.
  - `CoursePurchase`: `courseId`, `userId`, `amount`, `status`, `paymentId`.
- **Payment & Enrollment**: Stripe Checkout in INR (`unit_amount: coursePrice * 100`) + Webhook listener. Webhook updates `enrolledCourses` array on `User` and `enrolledStudents` array on `Course`.

### Feature Gap Matrix

| Marketplace Requirement | Existing Implementation | Missing | Proposed Modification |
| :--- | :--- | :--- | :--- |
| **Student Accounts** | Complete (`User` model) | Wishlists / Follows | Keep existing model; add instructor follow in P2 |
| **Instructor Accounts** | Direct signup (`role: instructor`) | Application state & approval tracking | Restrict direct signup; require application flow |
| **Instructor Application** | None | Schema, application form, status tracking | Create `InstructorApplication` model |
| **Instructor Approval** | None | Admin approval/rejection UI & API | Add `/admin/instructor-applications` routes & UI |
| **Instructor Profile** | Basic fields (`name`, `jobTitle`) | Public bio, social links, rating, total students | Extend `User` schema; build `/instructor/:id` page |
| **Course Creation** | Basic Studio (`AddCourse`, `EditCourse`) | Moderation status badge & submission flow | Add `submitForReview` flow in Studio |
| **Course Ownership** | `creator` field in `Course` | Backend ownership checks | Add `verifyCourseOwnership` middleware |
| **Course Moderation** | `isPublished: Boolean` | `status: DRAFT / PENDING_REVIEW / APPROVED / REJECTED` | Add `status` field to `Course` schema |
| **Course Marketplace Catalog**| Basic search & category grid | Popular/trending sorting, verified badges | Enhance `Courses.jsx` & `SearchPage.jsx` |
| **Course Purchase** | Stripe checkout session + Webhook | Revenue split ledger | Compute platform fee vs. instructor share on webhook |
| **Instructor Earnings** | Aggregated total in admin dashboard | Per-instructor net balance & ledger | Build instructor-specific revenue API & Studio tab |
| **Reviews & Ratings** | None | `Review` schema, rating calculation, review form | Build review system restricted to enrolled students |

---

## 3. Database Schema Evolution Plan

> **Note**: No schema changes are executed yet. The following specifications describe the proposed extensions.

### 3.1 Extended `User` Schema
```javascript
// Add to server/models/user.model.js
bio: { type: String, default: "" },
socialLinks: {
  website: { type: String, default: "" },
  youtube: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" }
},
isVerifiedInstructor: { type: Boolean, default: false },
instructorStatus: {
  type: String,
  enum: ["NONE", "PENDING", "APPROVED", "REJECTED"],
  default: "NONE"
}
```

### 3.2 New `InstructorApplication` Schema
```javascript
// New file: server/models/instructorApplication.model.js
import mongoose from "mongoose";

const instructorApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    headline: { type: String, required: true },
    biography: { type: String, required: true },
    expertiseCategory: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    sampleContentUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },
    rejectionReason: { type: String, default: "" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const InstructorApplication = mongoose.model("InstructorApplication", instructorApplicationSchema);
```

### 3.3 Extended `Course` Schema
```javascript
// Add to server/models/course.model.js
status: {
  type: String,
  enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED"],
  default: "DRAFT"
},
rejectionReason: { type: String, default: "" },
averageRating: { type: Number, default: 0 },
totalReviews: { type: Number, default: 0 }
```

### 3.4 New `Review` Schema
```javascript
// New file: server/models/review.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

// Ensure one review per user per course
reviewSchema.index({ courseId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
```

### 3.5 Extended `CoursePurchase` Schema
```javascript
// Add to server/models/coursePurchase.model.js
instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
platformFee: { type: Number, default: 0 },       // e.g. 20% platform share
instructorEarning: { type: Number, default: 0 }  // e.g. 80% instructor share
```

---

## 4. API Endpoints Strategy

### 4.1 Instructor Onboarding & Admin Governance
- `POST /api/v1/instructor/apply`: Submit instructor application.
- `GET /api/v1/instructor/application-status`: Fetch student's current application status.
- `GET /api/v1/admin/instructor-applications`: Fetch all pending applications (Admin only).
- `PATCH /api/v1/admin/instructor-applications/:id`: Approve or reject application (updates user `role` and `isVerifiedInstructor`).

### 4.2 Course Ownership & Quality Moderation
- `PATCH /api/v1/course/:courseId/submit-review`: Instructor submits draft course for admin approval.
- `GET /api/v1/admin/courses/pending`: List all courses waiting for review.
- `PATCH /api/v1/admin/course/:courseId/approve`: Admin approves course for public marketplace display.
- `PATCH /api/v1/admin/course/:courseId/reject`: Admin rejects course with feedback.

### 4.3 Public Profiles & Reviews
- `GET /api/v1/user/instructor/:id`: Get public instructor portfolio, bio, ratings, and courses.
- `POST /api/v1/course/:courseId/review`: Submit course review (verifies user is enrolled).
- `GET /api/v1/course/:courseId/reviews`: Get public reviews for a course.

### 4.4 Instructor Earnings & Analytics
- `GET /api/v1/purchase/instructor-earnings`: Get sales count, platform fee deductions, and net earnings for logged-in instructor.

---

## 5. Security & Authorization Rules

1. **Role Guard Middleware (`isInstructor`, `isAdmin`)**:
   - Verify `user.role === "instructor"` or `user.role === "admin"`.
2. **Course Ownership Check (`verifyCourseOwnership`)**:
   - Compare `course.creator.toString() === req.id`. Return `403 Forbidden` if mismatched.
3. **Public Marketplace Protection**:
   - `searchCourse` and `getPublishedCourse` queries must enforce `isPublished: true` AND `status: "APPROVED"`.
4. **Review Submission Guard**:
   - Verify user has a completed `CoursePurchase` for the given `courseId` before allowing review creation.

---

## 6. Safe Incremental Implementation Roadmap

```text
PHASE 1: Security, Models & Instructor Application (P0)
  ├── 1.1 Add Extended Schemas (User, Course, CoursePurchase, InstructorApplication, Review)
  ├── 1.2 Implement Middleware (isAdmin, isInstructor, verifyCourseOwnership)
  └── 1.3 Build Instructor Application & Admin Approval Endpoints + UI

PHASE 2: Course Moderation Lifecycle & Ownership Hardening (P0)
  ├── 2.1 Update Course Controller with Ownership Checks
  ├── 2.2 Add Submit-for-Review & Admin Approval Endpoints
  └── 2.3 Update Instructor Studio Course Table with Status Badges

PHASE 3: Public Instructor Profile & Student Review Engine (P1)
  ├── 3.1 Build Public Instructor Profile API & Frontend View (/instructor/:id)
  └── 3.2 Build Course Review API & UI Integration in CourseDetail.jsx

PHASE 4: Instructor Revenue Split Ledger & Studio Earnings (P1/P2)
  ├── 4.1 Update Webhook to compute 80/20 Revenue Split
  └── 4.2 Build Instructor Earnings Endpoint & Studio Earnings Dashboard
```

---

## 7. Verification & Change Control Guarantees

- **No Overwriting**: Existing endpoints and working Redux RTK Query APIs will be preserved and extended.
- **Zero Hardcoded Stats**: All displayed metrics (ratings, total students, revenue) will be derived directly from Mongo aggregation pipelines.
- **Full Build Integrity**: Every phase will be validated via `npm run build` to ensure continuous stability.
