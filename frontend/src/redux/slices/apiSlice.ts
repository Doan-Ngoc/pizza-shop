import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getMessage: builder.query<string, void>({
      query: () => "/",
    }),
  }),
});

export const { useGetMessageQuery } = apiSlice;
