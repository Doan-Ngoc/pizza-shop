import cartReducer, { addCartItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart } from '../src/redux/slices/cartSlice';
import orderReducer, { createOrder, resetOrder } from "../src/redux/slices/orderSlice";

const initialState = { cartData: [] };

describe("Cart Reducer", () => {
  it("should add an item to the cart", () => {
    const newItem = { id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" };
    const state = cartReducer(initialState, addCartItem(newItem));
    expect(state.cartData).toHaveLength(1);
    expect(state.cartData[0]).toEqual(newItem);
  });

  it("should increase quantity of an existing item", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, increaseQuantity(cartData[0].id));
    expect(state.cartData[0].quantity).toBe(2);
  });

  it("should decrease quantity of an existing item", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 2, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, decreaseQuantity(cartData[0].id));
    expect(state.cartData[0].quantity).toBe(1);
  });

  it("should remove an item from the cart", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, deleteItem(cartData[0].id));
    expect(state.cartData).toHaveLength(0);
  });

  it("should clear the cart", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, clearCart());
    expect(state.cartData).toEqual([]);
  });
});


describe('orderReducer', () => {
  const initialState = {
    name: '',
    address: '',
    phone: '',
    items: [],
    orderPrice: 0,
    shippingFee: 0,
    discount: 0,
  };

  // Test createOrder reducer
  it('should add data to new order', () => {
    const newOrderData = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '123-456-7890',
      orderPrice: 100,
      shippingFee: 10,
      discount: 5,
    };

    const state = orderReducer(initialState, createOrder(newOrderData));
    expect(state).toEqual({
      ...initialState, 
      ...newOrderData, 
    });
  });

  // Test resetOrder reducer
  it('should reset order state', () => {
    const state = orderReducer(initialState, resetOrder());
    expect(state).toEqual(initialState);
  });
});
