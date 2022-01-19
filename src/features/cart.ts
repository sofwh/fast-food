import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiKey, baseURL, warehouseId } from "../constant";
import {
  AddToCartData,
  AddToCartItems,
  UpdateCartItems,
  GetCartResponse,
} from "../types/cart";

const token = Cookies.get("access_token")! as string;

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("Api-key", apiKey);
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Warehouse-Id", warehouseId);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "api/v4/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<AddToCartData, AddToCartItems>({
      query: ({ productId, priceId, quantity }) => ({
        url: "api/v4/cart-product",
        method: "POST",
        body: {
          productId: productId,
          priceId: priceId,
          quantity: quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<AddToCartData, UpdateCartItems>({
      query: ({ cartProductId, quantity }) => ({
        url: `api/v4/cart-product/${cartProductId}`,
        method: "PATCH",
        body: {
          quantity: quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation<AddToCartData, number>({
      query: (cartProductId) => ({
        url: `api/v4/cart-product/${cartProductId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation<void, void>({
      query: () => ({
        url: `api/v4/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} = cartApi;
