import { FoodItem, MenuState } from "../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MenuState = {
    allDishes: [],
  };
  
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
      setMenuData: (state, action: PayloadAction<FoodItem[]>) => {
        state.allDishes = action.payload;
      },
    },
  });
  
  export const { setMenuData } = menuSlice.actions;
  export default menuSlice.reducer; 