import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiKey, baseURL, warehouseId } from "../constant";
import Cookies from "js-cookie";
import { PaymentMethod } from "../types/payment";

const token = Cookies.get("access_token");

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Warehouse-Id", warehouseId);
      headers.set("Api-key", apiKey);
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getPaymentMethod: builder.query<PaymentMethod, void>({
      query: () => ({
        url: "api/v4/payment-method",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentMethodQuery } = paymentApi;
