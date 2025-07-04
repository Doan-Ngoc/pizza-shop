import "./homepage-css/Homepage.css";
import PromotionSlider from "./PromotionSlider";
import WhyUs from "./WhyUs";
import NewDish from "./NewDish";
import PopularDish from "./PopularDish";
import Delivery from "./Delivery";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <PromotionSlider />
      <WhyUs />
      <NewDish />
      <PopularDish />
      <Delivery />
    </div>
  );
};

export default Homepage;
