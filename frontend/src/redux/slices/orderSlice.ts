import { CartItem, CartState, OrderState } from "../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrderState = {
    name: '',
    address: '',
    phone: '',
    email: '',
    items: [],
    orderPrice: 0,
    shippingFee: 0,
    discount: 0,
    couponCode: '',
    createdAt: ''
  };
  
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      createOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
        Object.assign(state, action.payload);
      },
      resetOrder: () => initialState,
    },
  });
  
  export const { createOrder, resetOrder } = orderSlice.actions;
  export default orderSlice.reducer; 