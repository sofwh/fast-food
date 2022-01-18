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
  OrderHistory,
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
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        headers.set("Warehouse-Id", warehouseId);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createNewUser: builder.mutation<UserResponse, UserRegister>({
      query: ({ first_name, last_name, email, mobile_number, password }) => ({
        url: "api/v4/auth/signup",
        method: "POST",
        body: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          mobile_number: mobile_number,
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
      query: ({ first_name, last_name }) => ({
        url: "api/v4/profile",
        method: "PATCH",
        body: JSON.stringify({
          "first-name": first_name,
          "last-name": last_name,
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
      query: ({ old_password, new_password, confirm_password }) => ({
        url: "api/v4/profile/change-password",
        method: "POST",
        body: JSON.stringify({
          "old-password": old_password,
          "new-password": new_password,
          "confirm-password": confirm_password,
        }),
      }),
    }),
    orderHistory: builder.query<OrderHistory, void>({
      query: () => ({
        url: `api/v4/order`,
        method: "GET",
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
  useOrderHistoryQuery,
} = usersApi;
