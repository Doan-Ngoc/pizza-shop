import "./Menu.css";
import { useMenu } from "../../context/MenuContext";
import ProductItem from "../../components/ProductItem/ProductItem";
import { FoodItem } from "../../redux/interfaces";

const Menu: React.FC = () => {
  // Fetch menu data
  const { data, isLoading, error } = useMenu();
  const menuData: FoodItem[] = data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching menu</p>;

  const renderDishes = (category: string) => {
    return menuData
      .filter((dish) => dish.category === category)
      .map((dish) => (
        <div className="col-lg-3 col-md-6 col-sm-12" key={dish.name}>
          <ProductItem dish={dish} />
        </div>
      ));
  };
  return (
    <div className="menu">
      <img
        className="menu-header img-fluid"
        src="images/menu-page/menu-header.png"
      />
      <div className="menu-category">
        <h2>KHAI VỊ</h2>
        <div className="listPopularDish row">{renderDishes("khaivi")}</div>
      </div>
      <div className="menu-category">
        <h2>GÀ RÁN</h2>
        <div className="listPopularDish row">{renderDishes("chicken")}</div>
      </div>
      <div className="menu-category">
        <h2>PIZZA</h2>
        <div className="listPopularDish row">{renderDishes("pizza")}</div>
      </div>
      <div className="menu-category">
        <h2>SALAD</h2>
        <div className="listPopularDish row">{renderDishes("salad")}</div>
      </div>
    </div>
  );
};

export default Menu;
