import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseURL, warehouseId } from "../constant";
import { CategoryResponse } from "../types/categories";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Warehouse-Id", warehouseId);
      headers.set("Api-key", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, void>({
      query: () => ({
        url: "api/v4/category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
