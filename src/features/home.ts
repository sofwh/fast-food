import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseURL, warehouseId } from "../constant";
import { HomeResponse } from "../types/home";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Warehouse-Id", warehouseId);
      headers.set("Api-key", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHome: builder.query<HomeResponse, void>({
      query: () => ({
        url: "api/v4/newhome",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHomeQuery } = homeApi;
