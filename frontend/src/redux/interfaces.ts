export interface FoodItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    isPopular: boolean;
    category: string; 
  }
  
  export interface MenuState {
    allDishes: FoodItem[]; 
  }
  
  //For items that may have additional options
  type CartItemOptions = Record<string, string | number | boolean | undefined>;

  export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    priceOfOne: number;
    totalPrice: number;
    image: string;
    options?: CartItemOptions;
  };
  
  export interface CartState {
    cartData: CartItem[]; 
  }