# AI Guru Nepal — TypeScript Migration Plan

## 1. Current Architecture

AI Guru Nepal (`mero-pathsala`) is a production-oriented MERN learning platform.

- **Backend Architecture**:
  - Runtime: Node.js (ES Modules) with Express.js
  - Database: MongoDB with Mongoose ORM
  - Authentication: JWT cookies (`jsonwebtoken`, `bcryptjs`)
  - Storage & Media: Cloudinary, Multer
  - Security: `helmet`, `express-mongo-sanitize`, `express-rate-limit`
  - Modules: Auth, User, Course, Lecture, Progress, Purchase, Blog, Tool, Prompt, News, Roadmap, Recommendation, Analytics, Instructor, Chat/AI (SLX).
  - Entry point: `server/index.js` -> `server/src/server.js` -> `server/src/app.js`.

- **Frontend Architecture**:
  - Framework: React 18 with Vite
  - State Management: Redux Toolkit (RTK Query for API layer, slices for auth)
  - Routing: React Router v6 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
  - Styling: Tailwind CSS with Shadcn UI / Radix primitives
  - Components: Reusable UI primitives (`client/src/components/ui`), pages, lesson views, rich text editor, analytics dashboards.
  - Entry point: `client/src/main.jsx` -> `client/src/App.jsx`.

---

## 2. File Inventory (Before Migration)

| Location | File Type | Count |
| :--- | :--- | :--- |
| Server | `.js` files | 69 |
| Client | `.js` files | 18 |
| Client | `.jsx` files | 124 |
| Total JavaScript Source Files | | **211** |

---

## 3. TypeScript Status (Before Migration)

- **Total TS/TSX files**: 0
- **TypeScript strict mode enabled**: Not configured yet
- **Shared Type Definitions**: 0

---

## 4. Backend Migration Plan

1. **Dependencies & Tooling**:
   - Install `typescript`, `tsx`, `@types/node`, `@types/express`, `@types/cors`, `@types/cookie-parser`, `@types/jsonwebtoken`, `@types/bcryptjs`, `@types/multer` in `server`.
   - Add `tsconfig.json` with strict mode enabled (`"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`).

2. **Types Directory**:
   - Establish `server/src/types/`:
     - `auth.types.ts`
     - `user.types.ts`
     - `course.types.ts`
     - `lecture.types.ts`
     - `progress.types.ts`
     - `blog.types.ts`
     - `tool.types.ts`
     - `prompt.types.ts`
     - `news.types.ts`
     - `roadmap.types.ts`
     - `instructor.types.ts`
     - `admin.types.ts`
     - `notification.types.ts`
     - `recommendation.types.ts`
     - `api.types.ts`
     - `common.types.ts`

3. **Database Models**:
   - Convert Mongoose schemas & models in `server/models/` to `.ts`.
   - Provide explicit document interfaces (`ICourse`, `IUser`, `ILecture`, etc.) extending `Document`.
   - Properly type refs (`Types.ObjectId`).

4. **Middleware & Authentication**:
   - Extend Express `Request` type for `req.user` and `req.id` in `AuthenticatedRequest`.
   - Convert `isAuthenticated.js` -> `isAuthenticated.ts`.

5. **Utils & Config**:
   - Convert `server/src/config/db.js` -> `db.ts`.
   - Convert `server/utils/*.js` -> `.ts` (`cloudinary.ts`, `emailTemplates.ts`, `generateToken.ts`, `multer.ts`).

6. **Controllers**:
   - Convert all 18 controller files to TypeScript.
   - Type req/res/next with `Request<Params, ResBody, ReqBody, ReqQuery>`.

7. **Routes & Server Startup**:
   - Convert all 15 route files to `.ts`.
   - Convert `server/src/app.js` -> `app.ts` and `server/src/server.js` -> `server.ts`.
   - Update `server/package.json` dev script to use `tsx` or `ts-node-dev`.

---

## 5. Frontend Migration Plan

1. **Dependencies & Tooling**:
   - Install `typescript`, `@types/react`, `@types/react-dom`, `@types/node` in `client`.
   - Add `tsconfig.json` and `tsconfig.node.json` with strict mode.
   - Rename `vite.config.js` -> `vite.config.ts`.

2. **Types Architecture**:
   - Establish `client/src/types/` mirroring backend types and adding UI/Form/Component state types.

3. **API & Redux Layer**:
   - Convert Redux store (`store.ts`, `rootReducer.ts`, `authSlice.ts`).
   - Convert RTK Query slices (`authApi.ts`, `courseApi.ts`, `blogApi.ts`, `toolApi.ts`, `promptApi.ts`, `newsApi.ts`, `roadmapApi.ts`, `instructorApi.ts`, `homepageApi.ts`, `purchaseApi.ts`, `slxApi.ts`, `courseProgressApi.ts`).
   - Provide strongly typed generics for endpoints.

4. **Utils & UI Primitives**:
   - Convert `client/src/lib/utils.js` -> `utils.ts`.
   - Convert all components in `client/src/components/ui/` from `.jsx` to `.tsx`.

5. **Components & Layouts**:
   - Convert Navbar, Footer, ProtectedRoutes, SEO, RichTextEditor, CommentSection, etc.

6. **Pages**:
   - Convert Student pages, Course pages, Lesson views, Admin pages, Instructor pages, Content pages, Roadmaps pages.

7. **Main Entry Point**:
   - Convert `App.jsx` -> `App.tsx` and `main.jsx` -> `main.tsx`.

---

## 6. Dependency Changes

### Server (`server/package.json`):
- `typescript`
- `tsx`
- `@types/node`
- `@types/express`
- `@types/cors`
- `@types/cookie-parser`
- `@types/jsonwebtoken`
- `@types/bcryptjs`
- `@types/multer`

### Client (`client/package.json`):
- `typescript`
- `@types/react`
- `@types/react-dom`
- `@types/node`

---

## 7. Risk Areas & Mitigation Strategy

1. **Express Request Extension**:
   - *Risk*: `req.user` attached by `isAuthenticated` middleware causing TS compilation errors across controllers.
   - *Mitigation*: Create an `AuthenticatedRequest` interface and express module declaration merging (`Express.Request`).

2. **Mongoose Document & Query Typing**:
   - *Risk*: Population, lean queries, virtual properties returning loose objects.
   - *Mitigation*: Define document interfaces explicitly and use typed helper generic types for queries.

3. **RTK Query Endpoints**:
   - *Risk*: API mutations and queries returning un-typed `any` data or breaking React components.
   - *Mitigation*: Strongly type request parameters and response payloads for every RTK Query endpoint.

4. **Component Props & Synthetic Events**:
   - *Risk*: Implicit `any` in form input handlers, custom dropdown selectors, and rich text editor hooks.
   - *Mitigation*: Annotate standard React event handlers (`React.ChangeEvent<HTMLInputElement>`, `React.FormEvent`, etc.) explicitly.

---

## 8. Migration Order

```text
[Phase 1] Audit & Plan (Done)
    │
[Phase 2 & 3] TS Configuration & Shared Types Architecture
    │
[Phase 4 - 9] Server Migration
    ├── Server TS Config & Shared Server Types
    ├── Config & Database Connection
    ├── Mongoose Models
    ├── Auth & Middleware
    ├── Utility Functions
    ├── Controllers
    └── Routes & App Setup
    │
[Phase 10] Server Build & Compilation Check
    │
[Phase 11 - 17] Client Migration
    ├── Client TS Config & Shared Client Types
    ├── Redux & RTK Query API Services
    ├── Lib Utils & Base UI Primitives (Shadcn/Radix)
    ├── Shared Components & Layouts
    ├── Feature Pages (Auth, Student, Courses, Admin, Instructor, Content, Roadmaps)
    └── App Entrypoint (App.tsx, main.tsx)
    │
[Phase 18 - 21] Deep Type Optimization (Zero any, Env config, Error Handling)
    │
[Phase 22 - 24] E2E Verification & Final Cleanup
```

---

## 9. Testing Strategy

1. **Compilation Testing**:
   - Execute `npx tsc --noEmit` on server and client to guarantee zero TypeScript errors.

2. **Runtime API Testing**:
   - Verify Auth flows (Register, Login, User profile).
   - Verify Course management & progress endpoints.
   - Verify Blog, Tool, Prompt, News, Roadmap CRUD operations.

3. **Build Testing**:
   - Run `npm run build` on client to confirm Vite build succeeds.
   - Run `npm run build` / `tsc` on server to confirm backend transpiles without error.

---

## 10. Estimated Migration Stages

- **Stage 1**: Phase 1 — Audit & Plan (Complete)
- **Stage 2**: Phase 2 & 3 — TypeScript Setup & Centralized Types
- **Stage 3**: Phase 4 to 9 — Complete Backend Migration
- **Stage 4**: Phase 10 — Backend Verification & Testing
- **Stage 5**: Phase 11 to 17 — Complete Frontend Migration
- **Stage 6**: Phase 18 to 21 — Unsafe Type Elimination & Quality Hardening
- **Stage 7**: Phase 22 to 24 — Final Build, Verification & Documentation Update
