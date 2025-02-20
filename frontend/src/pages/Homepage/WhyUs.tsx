import "./homepage-css/why-us-responsive.css"
import { useEffect } from "react";
const WhyUs: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollImg = document.getElementById("scroll-image");
      if (!scrollImg) return;
      const scrollImgRect = scrollImg.getBoundingClientRect();
      if (
        scrollImgRect.top < window.innerHeight &&
        scrollImgRect.bottom >= 0 &&
        !scrollImg.classList.contains("spin")
      ) {
        scrollImg.classList.add("spin");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="why-us">
      <div className="why-us-img d-flex justify-content-center">
        <img
          className="scroll-img img-fluid"
          id="scroll-image"
          src="images\homepage\scroll-image.png"
        />
      </div>
      <div className="why-us-text">
        <h2 className="title">Một trải nghiệm ẩm thực đích thực</h2>
        <p>
          Phục vụ những món ăn ngon cho thực khách thưởng thức là một nghĩa vụ
          của chúng tôi. Pizza TNT luôn mong muốn mỗi vị khách khi thưởng thức
          những món ăn của chúng tôi đều cảm thấy phấn khích hơn, hạnh phúc hơn.
          <br />
          Mọi điều chúng tôi làm, luôn luôn hướng đến "Mang lại WOW, Chia sẻ
          hạnh phúc". Ở Pizza TNT, chúng tôi có 4 nguyên tắckhông bao giờ bị phá
          vỡ:
        </p>
        <div className="why-us-reasons">
          <div className="why-us-reasons-item">
            <i className="fa fa-cheese"></i>
            <span>Phô mai tự sản xuất</span>
          </div>

          <div className="why-us-reasons-item">
            <i className="fa fa-pizza-slice"></i>
            <span>Nguyên liệu thượng hạng</span>
          </div>
          <div className="why-us-reasons-item">
            <i className="fa fa-utensils"></i>
            <span>Hương vị nguyên bản</span>
          </div>
          <div className="why-us-reasons-item">
            <i className="fa fa-clock"></i>
            <span>Giao hàng nhanh chóng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
