import React from "react";
import { Carousel } from "antd";

const settings = {
  dots: false,
  autoplay: true,
  effect: "fade",
};

export default function HomeCarousel(props) {
  return (
    <Carousel className="carousel-main" {...settings}>
      <div className="carousel-1">
        <span>Andrea</span>
        <span>, Fashion Designer</span>
      </div>
      <div className="carousel-2">
        <span>Moon</span>
        <span>, Marketing Expert</span>
      </div>
      <div className="carousel-3">
        <span>Ritika</span>
        <span>, Showmarker and Designer</span>
      </div>
      <div className="carousel-4">
        <span>Zach</span>
        <span>, Bar Owner</span>
      </div>
      <div className="carousel-5">
        <span>Gabrielle</span>
        <span>, Video Editor</span>
      </div>
    </Carousel>
  );
}
