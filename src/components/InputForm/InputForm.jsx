import { Input } from 'antd'
import React, { useState } from 'react'

const InputForm = (props) => {
  const [ valueInput, setValueInput ] = useState('')
  const { placeholder = 'Nhập text', ...rests} = props
  return (
    <Input placeholder={ placeholder} valueInput={valueInput} {...rests} />
  )
}

export default InputForm