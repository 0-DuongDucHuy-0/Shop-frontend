import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageProductSmall from '../../assets/images/testSmall.webp'
import { WrapperStyleColImage, WrapperStyleSmail } from './style'


const ProductDetailsComponent = () => {
  return (
    <Row style={{ padding: '16px', background: '#fff' }} >
        <Col span={10}>
            <Image src= {imageProduct} alt='image product' preview={false} />
            <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }} >
                <WrapperStyleColImage span={4}>
                    <WrapperStyleSmail src={imageProductSmall} alt='imageProductSmall' preview={false} />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleSmail src={imageProductSmall} alt='imageProductSmall' preview={false} />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleSmail src={imageProductSmall} alt='imageProductSmall' preview={false} />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleSmail src={imageProductSmall} alt='imageProductSmall' preview={false} />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                    <WrapperStyleSmail src={imageProductSmall} alt='imageProductSmall' preview={false} />
                </WrapperStyleColImage>
            </Row>
        </Col>
        <Col span={14}>
            col_1
        </Col>
    </Row>
  )
}

export default ProductDetailsComponent