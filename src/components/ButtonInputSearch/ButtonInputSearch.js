import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import React from 'react'
import styled from 'styled-components';

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
        <Input 
            size={size} 
            placeholder={placeholder} 
            bordered = {bordered}
            style={{ background: backgroundColorInput}}
        />
        <Button 
            size={size} 
            style={{ background: backgroundColorButton, border: !bordered && 'none'}}
            icon={<SearchOutlined style={{ color: colorButton }} />}
        ><span style={{ color: colorButton }}>{textButton}</span></Button>
    </div>
  )
}

export default ButtonInputSearch