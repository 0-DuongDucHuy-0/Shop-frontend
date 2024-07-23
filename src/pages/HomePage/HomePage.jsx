import React from 'react'
import TypeProduct from '../../routers/TypeProduct/TypeProduct'
import { WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'

import slider1 from '../../assets/images/slider1.png'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'


const HomePage = () => {
  const arr = ['Đồ ăn nhanh', 'Thịt lợn', 'Thịt gà', 'Sữa', 'Trứng']
  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div id="container" style={{backgroundColor: "#efefef", padding: '0 120px'}}>
        <SliderComponent arrImages = {[slider1, slider2, slider3]} />
      </div>
    </>
  )
}

export default HomePage