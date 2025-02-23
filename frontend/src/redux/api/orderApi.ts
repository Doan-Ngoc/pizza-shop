import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderState } from '../interfaces'; 

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), 
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderState, Partial<OrderState>>({
      query: (order) => ({
        url: '/order/create',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
