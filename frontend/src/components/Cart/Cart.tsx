import "./Cart.css";
import "./CartResponsive.css";
import { FaTrashAlt } from "react-icons/fa";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../../redux/slices/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart.cartData);

  //Calculate total price of the whole cart
  const allCartPrice = useMemo(() => {
    let allCartPrice = 0;
    for (const cartItem of cart) {
      allCartPrice += cartItem.totalPrice;
    }
    return allCartPrice;
  }, [cart]);

  //Create the cart content
  const cartBodyElements = cart.map((cartItem, index) => {
    const { id, name, image, priceOfOne, quantity, totalPrice } = cartItem;
    return (
      <tr key={id}>
        <th style={{ paddingTop: "20px" }} scope="row">
          {index + 1}
        </th>
        {/* Cart item information */}
        <td>
          <img
            src={`/images/menu-page/${image}`}
            alt={name}
            style={{
              width: "50%",
              height: "50px",
            }}
          />
        </td>
        <td style={{ paddingTop: "20px" }}>{name}</td>
        <td style={{ paddingTop: "20px" }}>
          {priceOfOne.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </td>
        {/* Increase or decrease quantity */}
        <td>
          <button
            style={{ background: "#0b603d" }}
            className="btn btn-primary"
            onClick={() => dispatch(decreaseQuantity(id))}
            disabled={cartItem.quantity <= 1}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            style={{ background: "#0b603d" }}
            className="btn btn-primary"
            onClick={() => dispatch(increaseQuantity(id))}
          >
            +
          </button>
        </td>
        {/* Item total price */}
        <td style={{ paddingTop: "20px" }}>
          {totalPrice.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </td>
        {/* Delete item button */}
        <td>
          <button
            style={{ background: "none", color: "#00814b", border: "none" }}
            className="btn btn-danger"
            onClick={() => dispatch(deleteItem(id))}
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="cart">
      {cart.length > 0 ? (
        <div className="container w-75 my-5">
          <h3 className="home-shoppingCart">
            <span>Giỏ hàng của bạn</span>
          </h3>
          <div>
            <table className="table table-cart my-5 text-center">
              {/* Table header */}
              <thead>
                <tr>
                  <th scope="col" style={{ width: "130px" }}>
                    #
                  </th>

                  <th scope="col"></th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {cartBodyElements}
                <tr style={{ backgroundColor: "var(--background-color-1" }}>
                  {/* Total cart price */}
                  <td
                    style={{ fontWeight: "600", fontSize: "1.1rem" }}
                    colSpan={2}
                  >
                    Tổng đơn hàng:
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                    {allCartPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Button to checkout page */}
          <div className="w-100 d-flex justify-content-center">
            <button className="Proceed-to-checkout rounded-pill">
              Thanh toán
            </button>
          </div>
        </div>
      ) : (
        // If there's no item in the cart
        <div className="m-5 d-flex justify-content-center align-items-center">
          <h4>
            Giỏ hàng của bạn chưa có sản phẩm nào,{" "}
            <Link to="/menu">tiếp tục mua sắm</Link>
          </h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
