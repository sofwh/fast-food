import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  apiKey,
  baseURL,
  clientId,
  clientSecret,
  grantType,
  warehouseId,
} from "../constant";
import Cookies from "js-cookie";
import {
  Address,
  AddressData,
  NewAddress,
  NewAddressData,
} from "../types/address";
import { buildQueries } from "@testing-library/react";

const token = Cookies.get("access_token");

export const addressApi = createApi({
  reducerPath: "addressApi",
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
    getAddress: builder.query<AddressData, void>({
      query: () => ({
        url: "api/v4/delivery-address",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    newAddress: builder.mutation<NewAddressData, NewAddress>({
      query: ({ title, latitude, longitude, isDefault }) => ({
        url: "api/v4/delivery-address",
        method: "POST",
        body: JSON.stringify({
          title: title,
          latitude: latitude,
          longitude: longitude,
          isDefault: isDefault,
        }),
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation<Address, number>({
      query: (id) => ({
        url: `api/v4/delivery-address/${id}`,
        method: "DELETE",
        body: {
          id: id,
        },
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useDeleteAddressMutation,
  useGetAddressQuery,
  useNewAddressMutation,
} = addressApi;
