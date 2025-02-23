import { createContext, useContext } from "react";
import { useGetMenuQuery } from "../redux/api/menuApi";
import { FoodItem } from "../redux/interfaces";

type MenuContextType = {
 data?: FoodItem[];
  error?: unknown;
  isLoading: boolean;
};

const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetMenuQuery();
  return (
    <MenuContext.Provider value={{ data, error, isLoading }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
