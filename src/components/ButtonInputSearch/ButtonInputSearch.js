import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import React from 'react'
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  const { 
    size, 
    placeholder, 
    textButton,
    bordered,
    backgroundColorInput = '#ffff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff'
  } = props  
  return (
    <div style={{ display: 'flex' }}>
        <InputComponent
            size={size} 
            placeholder={placeholder} 
            bordered = {bordered}
            style={{ background: backgroundColorInput}}
        />
        <ButtonComponent 
            size={size} 
            styleButton={{ background: backgroundColorButton, border: !bordered && 'none'}}
            icon={<SearchOutlined color={colorButton} style={{ color: '#ffff' }} />}
            textButton={textButton}
            styleTextButton={{ color: colorButton }}
        />
    </div>
  )
}

export default ButtonInputSearch