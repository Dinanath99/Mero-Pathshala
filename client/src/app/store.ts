import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { blogApi } from "@/features/api/blogApi";
import { toolApi } from "@/features/api/toolApi";
import { promptApi } from "@/features/api/promptApi";
import { newsApi } from "@/features/api/newsApi";
import { instructorApi } from "@/features/api/instructorApi";
import { homepageApi } from "@/features/api/homepageApi";
import { slxApi } from "@/features/api/slxApi";
import { roadmapApi } from "@/features/api/roadmapApi";
import { cvApi } from "@/features/api/cvApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware,
      blogApi.middleware,
      toolApi.middleware,
      promptApi.middleware,
      newsApi.middleware,
      instructorApi.middleware,
      homepageApi.middleware,
      slxApi.middleware,
      roadmapApi.middleware,
      cvApi.middleware
    ),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate(undefined, { forceRefetch: true }));
};

initializeApp();
