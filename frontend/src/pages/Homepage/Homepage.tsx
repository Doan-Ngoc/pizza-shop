import "./homepage-css/Homepage.css"
import PromotionSlider from "./PromotionSlider"
import WhyUs from "./WhyUs"
import NewDish from "./NewDish"
import Delivery from "./Delivery"

const Homepage: React.FC = () => {
  return (
    <div className='homepage'>
        <PromotionSlider />
        <WhyUs />
        <NewDish />
        <Delivery />
    </div>
  )
}

export default Homepage