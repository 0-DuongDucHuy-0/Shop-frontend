import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
  const { placeholder = 'Nhập text', ...rests} = props
  const handlerOnChangeInput = (e) => {
    props.onChange(e.target.value)
  }
  return (
    <WrapperInputStyle placeholder={ placeholder} value={props.value} {...rests} onChange={handlerOnChangeInput}/>
  )
}

export default InputForm