import cartReducer, { addCartItem, increaseQuantity, decreaseQuantity, deleteItem, clearCart } from '../src/redux/slices/cartSlice';
import orderReducer, { createOrder, resetOrder } from "../src/redux/slices/orderSlice";

describe("Cart Reducer", () => {
  const initialState = { cartData: [] };

  it("should add an item to the cart", () => {
    const newItem = { id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" };
    const state = cartReducer(initialState, addCartItem(newItem));
    expect(state.cartData).toHaveLength(1);
    expect(state.cartData[0]).toEqual(newItem);
  });

  it("should increase quantity of an existing item", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, increaseQuantity(prevState.cartData[0].id));
    expect(state.cartData[0].quantity).toBe(2);
  });

  it("should decrease quantity of an existing item", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 2, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, decreaseQuantity(prevState.cartData[0].id));
    expect(state.cartData[0].quantity).toBe(1);
  });

  it("should remove an item from the cart", () => {
    const prevState = { cartData: [{ id: 1, name: "Pizza", quantity: 1, priceOfOne: 10, totalPrice: 10, image: "pizza.jpg" }] };
    const state = cartReducer(prevState, deleteItem(prevState.cartData[0].id));
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
    email: '',
    items: [],
    orderPrice: 0,
    shippingFee: 0,
    discount: 0,
    couponCode: ''
  };

  const newOrderData = {
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    orderPrice: 100,
    shippingFee: 10
  };
  let orderState
  // Test createOrder reducer
  it('should add data to new order', () => {
    orderState = orderReducer(initialState, createOrder(newOrderData));
    expect(orderState).toEqual({
      ...initialState, 
      ...newOrderData, 
    });
  });

  // Test resetOrder reducer
  it('should reset order state', () => {
    orderState = orderReducer(orderState, resetOrder());
    expect(orderState).toEqual(initialState);
  });
});
