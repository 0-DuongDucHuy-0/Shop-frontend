import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from "antd";
import imageLogo from '../../assets/images/logo-login.png'

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: 'flex'
        }}
      >
        <WrapperContainerLeft>
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản và mua sắm</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" />
          <InputForm style={{ marginBottom: '10px' }} placeholder="password" />
          <InputForm placeholder="confirm password" />
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: '26px 0 10px'
            }}
            textButton={"Đăng nhập"}
            styleTextButton={{ color: "#fff" }}
          ></ButtonComponent>
          <p style={{fontSize: '13px'}} >Bạn đã có tài khoản? <WrapperTextLight>,Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height='203px' width='203px' />
          <h4>Mua sắm tại FOOD SHOP</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SignUpPage