import "./Menu.css";
import { useMenu } from "../../context/MenuContext";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ProductItem from "../../components/ProductItem/ProductItem";

const Menu: React.FC = () => {
  // Fetch menu data
  const { data, isLoading, error } = useMenu();
  const menuData = data ?? [];

  if (isLoading) return <Loading />
  if (error) return <Error />

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
      {isLoading ? (
        <div className="mt-5">
        <Loading />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Menu;
