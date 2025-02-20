import { Routes, Route } from "react-router-dom";
import "./App.css"
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <section className='page-content'>
        <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </section>
      <div className='footer-section'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
