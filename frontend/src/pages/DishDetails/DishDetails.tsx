import "./DishDetails.css";
import "./dish-details-responsive.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMenuQuery } from "../../redux/api/menuApi";
import { FoodItem, CartItem } from "../../redux/interfaces";
import { addCartItem } from "../../redux/slices/cartSlice";

const DishDetails = () => {

  const { id } = useParams<{ id: string }>();
  const dishId = Number(id);
  const dispatch = useDispatch();
  const { data: menuData, isLoading, error } = useGetMenuQuery();

  if (isLoading) return <p>Loading... Please wait.</p>;
  if (error) return <p>Error fetching dish details.</p>;

  // Find the dish by ID
  const dish: FoodItem | undefined = menuData?.find((item) => item.id === dishId);

  if (!dish) return <p>Dish not found.</p>;

  const handleAddToCart = () => {
    const cartItem = {
    id: dish.id,
    name: dish.name,
    priceOfOne: dish.price,
    image: dish.image
    }
    dispatch(addCartItem(cartItem))
  };

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
    </div>
  );
};

export default DishDetails;
