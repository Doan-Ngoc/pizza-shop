import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getMessage: builder.query<string, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetMessageQuery } = apiSlice;
