import "./Header.css";
import "./Header-responsive.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppSelector } from "../../redux/hooks";

const Header: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.cartData);
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
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              //   value={searchTerm}
              //   onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>

          <Link to="/cart">
            <button
              className="btn rounded-pill cart-btn d-flex align-items-center gap-1"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="fa fa-shopping-cart mr-2"></i>
              Giỏ hàng
              <span className="cart-quantity">
                {/* {lengthCart} */}
                {cart.length}
              </span>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
