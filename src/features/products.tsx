import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseURL, warehouseId } from "../constant";
import { Product, ProductData, SingleProductData } from "../types/Products";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Warehouse-Id", warehouseId);
      headers.set("Api-key", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductData, void>({
      query: () => ({
        url: "api/v4/product",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query<SingleProductData, number>({
      query: (id) => ({
        url: `api/v4/product/${id}`,
        method: "GET",
      }),
    }),
    getProductByCategory: builder.query<ProductData, number>({
      query: (id: number) => ({
        url: `api/v4/product/?categoryId=${id}`,
        method: "GET",
      }),
    }),
    getSearchedProuductByQuery: builder.query<ProductData, string>({
      query: (searchProduct) => ({
        url: `api/v4/product/?query=${searchProduct}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
  useGetSearchedProuductByQueryQuery,
  useGetSingleProductQuery,
} = productsApi;
