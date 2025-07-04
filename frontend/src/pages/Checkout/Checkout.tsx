import "./Checkout.css";
import "./checkout-responsive.css";
import { Modal } from "bootstrap";
import { useState, useEffect, useRef, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createOrder, resetOrder } from "../../redux/slices/orderSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { OrderState } from "../../redux/interfaces";
import { useCreateOrderMutation } from "../../redux/api/orderApi";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.order);
  const cartData = useAppSelector((state) => state.cart.cartData);
  // Tính tiền giỏ hàng
  const cartValue = useMemo(() => {
    let allPrice = 0;
    for (const cartItem of cartData) {
      allPrice += cartItem.totalPrice;
    }
    return allPrice;
  }, [cartData]);

  /*Tính tiền giảm giá*/
  const [inputCouponValue, setInputCouponValue] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleApply = () => {
    if (inputCouponValue === "anngon") {
      setCouponCode("anngon");
      setResultMessage("-30,000 đ");
      setDiscountAmount(30000);
    } else {
      setCouponCode("");
      setResultMessage("Mã giảm giá không hợp lệ");
      setDiscountAmount(0);
    }
  };

  /*Tính tiền ship*/
  let shippingFee = 0;
  if (cartValue - discountAmount <= 300000) {
    shippingFee = 20000;
  } else {
    shippingFee = 0;
  }

  /* Tổng tiền sau khi tính tiền ship và tiền giảm giá*/
  const [finalPrice, setFinalPrice] = useState(
    cartValue - discountAmount + shippingFee
  );
  useEffect(() => {
    setFinalPrice(cartValue + shippingFee - discountAmount);
  }, [shippingFee, discountAmount, cartValue]);

  // Submit form data
  const { register, handleSubmit } = useForm<Partial<OrderState>>();
  const confirmModalRef = useRef<HTMLDivElement>(null);
  const handleOrderSubmit: SubmitHandler<Partial<OrderState>> = async (
    data
  ) => {
    const orderDetail = {
      ...data,
      items: cartData,
      shippingFee: shippingFee,
      discount: discountAmount,
      couponCode: couponCode,
    };
    dispatch(createOrder(orderDetail));
    if (confirmModalRef.current) {
      const modal = new Modal(confirmModalRef.current);
      modal.show();
    }
  };

  //Confirm order and send data to backend
  const [createOrderMutation] = useCreateOrderMutation();
  const completeModalRef = useRef<HTMLDivElement>(null);
  const handleConfirmModal = async () => {
    try {
      await createOrderMutation(order);
      dispatch(resetOrder());
      dispatch(clearCart());
      if (confirmModalRef.current) {
        const modal = new Modal(confirmModalRef.current);
        modal.hide();
      }
      // Show success modal
      if (completeModalRef.current) {
        const modal = new Modal(completeModalRef.current);
        modal.show();
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  // Rendering
  return (
    <div className="checkout container">
      <div className="billing-detail w-50 m-auto">
        <h2 className="mb-4 text-center">Thông tin đơn hàng</h2>
        <form onSubmit={handleSubmit(handleOrderSubmit)}>
          <div
            className="form-container-checkout"
            style={{
              backgroundColor: "var(--background-color-1",
              padding: 30,
              borderRadius: "20px",
            }}
          >
            <div className="input-name">
              <span>Tên của bạn</span>
              <span style={{ color: "#D6763C" }}>*</span>
              <div>
                <input type="text" id="name" required {...register("name")} />
              </div>
            </div>
            <div className="input-address">
              <span>Địa chỉ giao hàng</span>
              <span style={{ color: "#D6763C" }}>*</span>
              <div>
                <input
                  type="text"
                  id="address"
                  required
                  {...register("address")}
                />
              </div>
            </div>
            <div className="input-phone">
              <span>Số điện thoại</span>
              <span style={{ color: "#D6763C" }}>*</span>
              <div>
                <input type="text" id="phone" required {...register("phone")} />
              </div>
            </div>
            <div className="input-mail">
              <span>Địa chỉ email</span>
              <span style={{ color: "#D6763C" }}>*</span>
              <div>
                <input type="email" id="mail" {...register("email")} />
              </div>
            </div>
            <div className="subtotal w-100 d-flex justify-content-between align-items-center">
              <div className="title-total-bill">Tổng đơn hàng:</div>
              <div className="subtotal-price">
                {cartValue.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </div>
            </div>
            <div className="coupon w-100 d-flex justify-content-between align-items-center">
              <div className="title-coupon">Mã giảm giá:</div>
              <div>
                <input
                  className="input-coupon"
                  style={{ padding: "0px 10px" }}
                  type="text"
                  value={inputCouponValue}
                  onChange={(e) => setInputCouponValue(e.target.value)}
                />
                <button
                  type="button"
                  className="coupon-btn rounded-pill ms-3"
                  onClick={handleApply}
                >
                  Áp dụng
                </button>
              </div>
            </div>
            <p className="fst-italic fs-6">
              (Nhập mã 'anngon', giảm ngay 30.000 đ!)
            </p>
            <div className="subtotal w-100 d-flex justify-content-between align-items-center">
              <div className="title-fee">Phí giao hàng:</div>
              <div className="subtotal-price">
                {shippingFee.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </div>
            </div>
            <p className="fst-italic fs-6">
              (Free ship cho đơn hàng từ 300.000 đ)
            </p>
            {resultMessage && (
              <div className="w-100 d-flex justify-content-end align-items-center discount-amount">
                {resultMessage}
              </div>
            )}
            <div className="subtotal w-100 d-flex justify-content-between align-items-center">
              <div>Tổng thanh toán:</div>
              <div className="subtotal-price">
                {finalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                className="place-order rounded-pill"
                id="place-order"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal xác nhận đặt hàng */}
      <div
        ref={confirmModalRef}
        className="modal fade"
        id="confirmModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              Xác nhận gửi đơn đặt hàng? <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="submit-btn rounded-pill"
                data-bs-dismiss="modal"
                onClick={handleConfirmModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal hoàn thành đơn hàng */}
      <div
        ref={completeModalRef}
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              Đơn hàng của bạn đã được ghi nhận. <br /> Cảm ơn bạn đã lựa chọn
              TNT Pizza.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="submit-btn rounded-pill"
                data-bs-dismiss="modal"
                onClick={() => navigate("/")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
