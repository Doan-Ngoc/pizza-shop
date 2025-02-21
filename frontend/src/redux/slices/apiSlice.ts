import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pizza-shop-api-l7ov.onrender.com/" }),
  endpoints: (builder) => ({
    getMessage: builder.query<string, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetMessageQuery } = apiSlice;
