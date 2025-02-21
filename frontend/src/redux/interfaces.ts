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
  