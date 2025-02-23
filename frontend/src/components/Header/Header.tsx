import "./Header.css";
import "./Header-responsive.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";
import { useMenu } from "../../context/MenuContext";

const Header: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.cartData);
  const navigate = useNavigate()

  // Function search
  const { data} = useMenu();
  const menuData = data ?? [];
  const [searchTerm, setSearchTerm] = useState("");

  let searchedResult = searchTerm
  ? menuData.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  //Reset search bar when navigating to a new page
  const location = useLocation();
  useEffect(() => {
  setSearchTerm("");
  searchedResult = [];
  }, [location.pathname]); 

  //Close search bar when clicked outside
  const searchRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchTerm(""); 
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-brand">
          <Link to="/">
            <img className="header-logo" src="/images/logo.png" />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav gap-3 rounded-pill">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                Về chúng tôi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
            </li>
          </ul>
        </div>
        <div className="search-and-cart">
          {/* Search */}
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <FaSearch />
            </div>
            {searchedResult.length >0 &&
          <div className="search-results">
            {searchedResult.map((dish) => (
              <Link
                to={`/dish-details/${dish.id}`}
                key={dish.id}
                className="search-result-item"
              >
                {dish.name}
              </Link>
            ))}
          </div>
          }
          </div>

            <button
              className="btn rounded-pill cart-btn d-flex justify-content-center align-items-center gap-1"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={() => navigate("/cart")}
            >
              <i className="fa fa-shopping-cart mr-2"></i>
              Giỏ hàng
              <span className="cart-quantity">
                {cart.length}
              </span>
            </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
