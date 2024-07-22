import { Col, Row } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/transfer/search'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';


const HeaderComponents = () => {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
            <WrapperTextHeader>
                ShopFood
            </WrapperTextHeader>
        </Col>
        <Col span={12}>
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            // onSearch={onSearch}
            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px'}}>
            <WrapperHeaderAccout>
                <div>
                    <UserOutlined style={{ fontSize: '30px' }} />
                </div>
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