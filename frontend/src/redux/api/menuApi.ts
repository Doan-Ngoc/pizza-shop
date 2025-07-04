import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FoodItem } from "../interfaces";

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
