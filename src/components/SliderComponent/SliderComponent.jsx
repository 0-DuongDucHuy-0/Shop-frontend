import Slider from 'react-slick';
import React from 'react'
import { Image } from 'antd';

const SliderComponent = ({arrImages}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image) => {
        return(
          <Image src={image} alt="slide" preview={false} width="100%" />
        )
      })}
    </Slider>
  )
}

export default SliderComponent