import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FoodItem } from "../interfaces"; 

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pizza-shop-api-l7ov.onrender.com/" }),
  endpoints: (builder) => ({
    getMenu: builder.query<FoodItem[], void>({
      query: () => "/menu",
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;
