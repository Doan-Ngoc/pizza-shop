import "./DishDetails.css"
import "./dish-details-responsive.css"
import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useGetMenuQuery } from "../../redux/api/menuApi";
import { FoodItem } from "../../redux/interfaces";

const DishDetails = () => {
   useLayoutEffect(() => {
      window.scrollTo(0, 0); 
    }, []);

  const { id } = useParams<{ id: string }>();
  const { data: menuData, isLoading, error } = useGetMenuQuery();

  if (isLoading) return <p>Loading... Please wait.</p>;
  if (error) return <p>Error fetching dish details.</p>;

  // Find the dish by ID
  const dish: FoodItem | undefined = menuData?.find((item) => item._id === Number(id));

  if (!dish) return <p>Dish not found.</p>;

  console.log(dish)

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
            <button className="round-black-btn rounded-pill">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
