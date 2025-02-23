import { CartItem, CartState } from "../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
    cartData: [],
  };
  
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addCartItem: (state, action: PayloadAction<Partial<CartItem>>) => {
      const existingItem = state.cartData.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increase quantity and update total price
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.priceOfOne;
      } else {
        //Add new item to cart
      state.cartData.push({
        id: action.payload.id ?? 0, 
        name: action.payload.name ?? "",
        priceOfOne: action.payload.priceOfOne ?? 0,
        image: action.payload.image ?? "",
        quantity: 1,
        totalPrice: action.payload.priceOfOne ?? 0
      })
      }
      },
      increaseQuantity: (state, action: PayloadAction<number>) => {
        const existingItem = state.cartData.find((item) => item.id === action.payload);
        if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.priceOfOne;
        }
      },
      decreaseQuantity: (state, action: PayloadAction<number>) => {
        const existingItem = state.cartData.find((item) => item.id === action.payload);
        if (existingItem) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.priceOfOne;
        }
      },
      deleteItem: (state, action: PayloadAction<number>) => {
        const existingItemIndex = state.cartData.findIndex((item) => item.id === action.payload);
        if (existingItemIndex!== -1) {
        state.cartData.splice(existingItemIndex, 1)
        }
      },
      clearCart: () => initialState,
    },
  });
  
  export const { addCartItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart } = cartSlice.actions;
  export default cartSlice.reducer; 