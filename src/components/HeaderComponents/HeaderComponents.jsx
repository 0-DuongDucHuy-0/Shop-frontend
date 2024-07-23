import { Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';


const HeaderComponents = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
            <WrapperTextHeader>
                ShopFood
            </WrapperTextHeader>
        </Col>
        <Col span={12}>
            <ButtonInputSearch 
                size = "large"
                bordered={false}
                textButton = "Tìm kiếm"
                placeholder = "input search text"
            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center'}}>
            <WrapperHeaderAccout>
                    <UserOutlined style={{ fontSize: '30px' }} />
                <div>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                    </div>
                </div>
            </WrapperHeaderAccout>
            <div>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff'}} />
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponents