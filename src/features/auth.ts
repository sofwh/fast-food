import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  apiKey,
  baseURL,
  clientId,
  clientSecret,
  grantType,
  warehouseId,
} from "../constant";
import {
  ForgotPasswordResponse,
  LoggedUser,
  LoginUser,
  UserRegister,
  UserResponse,
  UpdateUserProfile,
  ChangePasswordResponse,
  UserSuccess,
  ChangePasswordBody,
} from "../types/auth";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Api-key", apiKey);
      if (token !== "") {
        headers.set("Authorization", token as string);
      } else {
        headers.set("Warehouse-Id", warehouseId);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createNewUser: builder.mutation<UserResponse, UserRegister>({
      query: ({ firstName, lastName, email, phone, password }) => ({
        url: "api/v4/auth/signup",
        method: "POST",
        body: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile_number: phone,
          password: password,
        },
      }),
      invalidatesTags: ["User"],
    }),
    userLogin: builder.mutation<LoggedUser, LoginUser>({
      query: ({ email, password }) => ({
        url: `api/v4/auth/login`,
        method: "POST",
        body: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: grantType,
          username: email,
          password: password,
        },
      }),
      invalidatesTags: ["User"],
    }),

    userProfile: builder.query<UserSuccess, void>({
      query: () => ({
        url: `api/v4/profile/show`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<UserSuccess, UpdateUserProfile>({
      query: ({ firstName, lastName }) => ({
        url: "api/v4/profile",
        method: "PATCH",
        body: JSON.stringify({
          "first-name": firstName,
          "last-name": lastName,
        }),
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, string>({
      query: (email) => ({
        url: `api/v4/auth/forgot-password`,
        method: "POST",
        body: {
          email: email,
        },
      }),
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordBody
    >({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "api/v4/profile/change-password",
        method: "POST",
        body: JSON.stringify({
          "old-password": oldPassword,
          "new-password": newPassword,
          "confirm-password": confirmPassword,
        }),
      }),
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useUpdateUserMutation,
  useUserLoginMutation,
  useUserProfileQuery,
} = usersApi;
