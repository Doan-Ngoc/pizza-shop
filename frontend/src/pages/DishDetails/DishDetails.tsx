import "./DishDetails.css";
import "./dish-details-responsive.css";
import { Modal } from "bootstrap";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMenuQuery } from "../../redux/api/menuApi";
import { addCartItem } from "../../redux/slices/cartSlice";

const DishDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dishId = Number(id);
  const dispatch = useDispatch();
  const successModalRef = useRef<HTMLDivElement>(null);
  const { data: menuData, isLoading, error } = useGetMenuQuery();
  const dish: FoodItem | undefined = menuData?.find((item) => item.id === dishId);
  if (!dish) return <p>Dish not found.</p>;

  //Add to cart logic
  const handleAddToCart = () => {
    const cartItem = {
    id: dish.id,
    name: dish.name,
    priceOfOne: dish.price,
    image: dish.image
    }
    dispatch(addCartItem(cartItem))
    if (successModalRef.current) {
          const modal = new Modal(successModalRef.current);
          modal.show();
        }
  };
  
   // Find the dish by ID
   if (isLoading) return <p>Loading... Please wait.</p>;
   if (error) return <p>Error fetching dish details.</p>;
   
   if (!dish) return <p>Dish not found.</p>;

  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <div className="row mt-5 product-container">
        <div className="product-image-container col-md-6">
          <img className="product-image" src={`/images/menu-page/${dish.image}`} alt={dish.name} />
        </div>
        <div className="col-md-6">
          <div className="product-dtl">
            <h2 className="product-name">{dish.name}</h2>
            <p className="product-price">
              {dish.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
            </p>
            <p className="product-description">{dish.description}</p>
            <button className="round-black-btn rounded-pill" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Add to cart success modal */}
      <div
        ref={successModalRef}
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
             Thêm vào giỏ hàng thành công <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="submit-btn rounded-pill"
                data-bs-dismiss="modal"
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

export default DishDetails;
