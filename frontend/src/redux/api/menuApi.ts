import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FoodItem } from "../interfaces";

console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getMenu: builder.query<FoodItem[], void>({
      query: () => "/menu",
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;
