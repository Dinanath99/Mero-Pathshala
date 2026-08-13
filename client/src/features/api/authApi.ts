import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { AuthResponse, LoginInput, RegisterInput } from "../../types/auth.types";
import { UserProfileResponse } from "../../types/user.types";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterInput>({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, LoginInput>({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation<UserProfileResponse, FormData | Record<string, any>>({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
    toggleWishlist: builder.mutation<{ success: boolean; wishlist: string[] }, string>({
      query: (courseId) => ({
        url: `wishlist/${courseId}`,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
          const authState = (getState() as any).auth;
          if (authState && authState.user) {
            dispatch(
              userLoggedIn({
                user: { ...authState.user, wishlist: result.data.wishlist },
              })
            );
          }
        } catch (error) {
          console.log("Wishlist toggle error", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useToggleWishlistMutation,
} = authApi;
