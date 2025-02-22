import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Menu from "./pages/Menu/Menu";
import DishDetails from "./pages/DishDetails/DishDetails";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div className="App">
      <Header />
      <section className="page-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dish-details/:id" element={<DishDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </section>
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
