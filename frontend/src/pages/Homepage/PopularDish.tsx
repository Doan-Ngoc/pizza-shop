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
        // <div key={dish.name} className=" col-lg-3 col-xxl-3 col-md-6 col-sm-12">
        <div key={dish.name} className=" col">
          <ProductItem dish={dish} />
        </div>
      ));
  };

  /*Navbar*/
  const PopularDishNavBar = () => {
    return (
      <div className="row">
        <ul className="nav nav-tabs menu_tab row" id="myTab" role="tablist">
          <li
            className={`nav-item col-3 ${
              activeTab === "pizza" ? "active" : ""
            }`}
            onClick={() => handleTabClick("pizza")}
          >
            <a
              className="nav-link"
              id="pizza-tab"
              data-bs-toggle="tab"
              href="#pizza"
              role="tab"
            >
              PIZZA
            </a>
          </li>
          <li
            className={`nav-item col-3 ${
              activeTab === "chicken" ? "active" : ""
            }`}
            onClick={() => handleTabClick("chicken")}
          >
            <a
              className="nav-link"
              id="chicken-tab"
              data-bs-toggle="tab"
              href="#chicken"
              role="tab"
            >
              GÀ RÁN
            </a>
          </li>
          <li
            className={`nav-item col-3 ${
              activeTab === "appetizer" ? "active" : ""
            }`}
            onClick={() => handleTabClick("appetizer")}
          >
            <a
              className="nav-link"
              id="appetizer-tab"
              data-bs-toggle="tab"
              role="tab"
              href="#appetizer"
            >
              KHAI VỊ
            </a>
          </li>
          <li
            className={`nav-item col-3 ${
              activeTab === "salad" ? "active" : ""
            }`}
            onClick={() => handleTabClick("salad")}
          >
            <a
              className="nav-link"
              id="salad-tab"
              data-bs-toggle="tab"
              href="#salad"
              role="tab"
            >
              SALAD
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
  };

  //Render
  return (
    <div className="popular-dish mx-auto text-center">
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
