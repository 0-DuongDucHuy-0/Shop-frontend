import { Badge, Col } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';


const HeaderComponents = () => {
    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }
  return (
    <div style={{ width: '100%', background: 'rgb(26, 148,255)', display: 'flex', justifyContent: 'center'}} >
      <WrapperHeader>
        <Col span={5}>
            <WrapperTextHeader>
                ShopFood
            </WrapperTextHeader>
        </Col>
        <Col span={13}>
            <ButtonInputSearch 
                size = "large"
                textButton = "Tìm kiếm"
                placeholder = "input search text"
            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center'}}>
            <WrapperHeaderAccout>
                    <UserOutlined style={{ fontSize: '30px' }} />
                <div onClick={handleNavigateSignIn}>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                    </div>
                </div>
            </WrapperHeaderAccout>
            <div>
                <Badge count={4} size='small'>
                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff'}} />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponents