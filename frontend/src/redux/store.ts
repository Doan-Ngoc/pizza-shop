import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import menuReducer from "./slices/menuSlice"
import { menuApi } from "./api/menuApi";
import { orderApi } from "./api/orderApi";
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    menu: menuReducer,
    [menuApi.reducerPath]: menuApi.reducer,
    cart: cartReducer,
    order: orderReducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, menuApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
