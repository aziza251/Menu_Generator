import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./pages_styles/welcome.css";
import Header from "../Components/Header";

function Welcome_page() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Header />
      <div className="welcome-page">
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img
                src="https://media.istockphoto.com/id/545652444/vector/restaurant-cafe-menu-template-design.jpg?s=612x612&w=0&k=20&c=1uSa1pe57w3Z0MpuYrM1v8mq7-nJHXRnUOLi7DajKjU="
                alt="food"
              />
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/food-menu-creative-menu-design-layout-design-design-set-menu-restaurant_91128-1523.jpg"
                alt="food"
              />
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/fast-food-menu-template_23-2148896789.jpg"
                alt="food"
              />
            </div>
          </Slider>
        </div>
        <Link to="/menu-generate">
          <button className="welcome-button">Get Started</button>
        </Link>
      </div>
    </>
  );
}

export default Welcome_page;
