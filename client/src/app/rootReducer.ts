import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
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

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [toolApi.reducerPath]: toolApi.reducer,
  [promptApi.reducerPath]: promptApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [instructorApi.reducerPath]: instructorApi.reducer,
  [homepageApi.reducerPath]: homepageApi.reducer,
  [slxApi.reducerPath]: slxApi.reducer,
  [roadmapApi.reducerPath]: roadmapApi.reducer,
  [cvApi.reducerPath]: cvApi.reducer,
  auth: authReducer,
});

export default rootReducer;
