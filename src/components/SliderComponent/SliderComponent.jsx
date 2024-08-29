import React from "react";
import { Image } from "antd";
import { WrapperSlideStyle } from "./style";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <WrapperSlideStyle {...settings}>
      {arrImages.map((image) => {
        return <Image key={image} src={image} alt="slide" preview={false} width="100%" />;
      })}
    </WrapperSlideStyle>
  );
};

export default SliderComponent;
