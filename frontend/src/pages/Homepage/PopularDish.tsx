import "./homepage-css/popular-dish-responsive.css";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMenu } from "../../context/MenuContext";
import { FoodItem } from "../../redux/interfaces";
import ProductItem from "../../components/ProductItem/ProductItem";

const PopularDish: React.FC = () => {
  const { data, isLoading } = useMenu();
  const menuData: FoodItem[] = data ?? [];

  //Filter popular dish by category
  const filterPopularDish = (category: string) => {
    return menuData
      .filter((dish) => dish.isPopular === true && dish.category === category)
      .map((dish) => (
        <div key={dish.name} className=" col-lg-3 col-xxl-3 col-md-6 col-sm-12">
          <ProductItem dish={dish} />
        </div>
      ));
  };

  /*Navbar*/
  const PopularDishNavBar = () => {
    return (
      <div className="row">
        <ul className="nav nav-tabs menu_tab row" id="myTab" role="tablist">
          <li className="nav-item col-3">
            <a
              className={`nav-link ${activeTab === "pizza" ? "active" : ""}`}
              id="pizza-tab"
              data-bs-toggle="tab"
              href="#pizza"
              role="tab"
              onClick={() => handleTabClick("pizza")}
            >
              Pizza
            </a>
          </li>
          <li className="nav-item col-3">
            <a
              className="nav-link"
              id="chicken-tab"
              data-bs-toggle="tab"
              href="#spaghetti"
              role="tab"
              onClick={() => handleTabClick("chicken")}
            >
              Gà rán
            </a>
          </li>
          <li className="nav-item col-3">
            <a
              className={`nav-link ${
                activeTab === "appetizer" ? "active" : ""
              }`}
              id="appetizer-tab"
              data-bs-toggle="tab"
              role="tab"
              href="#appetizer"
              onClick={() => handleTabClick("appetizer")}
            >
              Khai vị
            </a>
          </li>
          <li className="nav-item col-3">
            <a
              className="nav-link"
              id="salad-tab"
              data-bs-toggle="tab"
              href="#salad"
              role="tab"
              onClick={() => handleTabClick("salad")}
            >
              Salad
            </a>
          </li>
        </ul>
      </div>
    );
  };

  /* Khi ấn vào 1 tab thì list đồ ăn tương ứng hiện ra */
  const [activeTab, setActiveTab] = useState("pizza");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    console.log("Tab đang active là", activeTab);
  };

  //Render
  return (
    <div className="popular-dish w-75 mx-auto text-center">
      <h2 className="name">Món ngon phải thử</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PopularDishNavBar />
          <div className="listPopularDish row">
            {activeTab === "pizza" && filterPopularDish("pizza")}
            {activeTab === "appetizer" && filterPopularDish("khaivi")}
            {activeTab === "chicken" && filterPopularDish("chicken")}
            {activeTab === "salad" && filterPopularDish("salad")}
          </div>
          <Link className="see-all-menu" to="/menu">
            <i>
              <h4>
                Xem toàn bộ menu
                <i className="fa fa-arrow-circle-right"></i>
              </h4>
            </i>
          </Link>
        </>
      )}
    </div>
  );
};

export default PopularDish;