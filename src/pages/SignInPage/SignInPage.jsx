import React, { useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import imageLogo from '../../assets/images/logo-login.png'
import { useNavigate } from "react-router-dom";
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserServices.loginUser(data)
  )

  const { data, isPending } = mutation

  console.log('mutation', mutation)

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  }
  const handlerNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
    console.log('sign-in', email, password)
  }

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
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm 
            style={{ marginBottom: '10px' }} 
            placeholder="abc@gmail.com" 
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={togglePasswordVisibility}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                transform: 'translateY(+50%)',
                cursor: 'pointer',
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm 
              placeholder='password' 
              type={isShowPassword ? "text" : "password"} 
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled = {!email.length || !password}
              onClick={handleSignIn}
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
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
          <p style={{fontSize: '13px'}} >Chưa có tài khoản? <WrapperTextLight onClick={handlerNavigateSignUp}>,Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height='203px' width='203px' />
          <h4>Mua sắm tại FOOD SHOP</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
