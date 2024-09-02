import React, { useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserServices.signupUser(data)
  )

  console.log('mutation', mutation)

  const { data, isPending } = mutation
  
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnChangePassword = (value) => {
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  }
  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')    
  }

  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
    console.log('sign-up', email, password, confirmPassword)
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản và mua sắm</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={togglePasswordVisibility}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
                transform: "translateY(+50%)",
                cursor: "pointer",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              style={{ marginBottom: '10px' }}
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={toggleConfirmPasswordVisibility}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
                transform: "translateY(+50%)",
                cursor: "pointer",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled = {!email.length || !password || !confirmPassword}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng ký"}
              styleTextButton={{ color: "#fff" }}
            ></ButtonComponent>
          </Loading>
          <p style={{ fontSize: "13px" }}>
            Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>,Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại FOOD SHOP</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
