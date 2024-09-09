import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [avatar, setAvatar] = useState(user?.avatar);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnChangeEmail = () => {};

  const handleOnChangeName = () => {};

  const handleOnChangePhone = () => {};

  const handleOnChangeAddress = () => {};

  const handleOnChangeAvatar = () => {};

  const handleUpdate = () => {};

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "0 40px",
        height: "500px",
      }}
    >
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="name"
            value={name}
            onChange={handleOnChangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="email"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="phone"
            value={phone}
            onChange={handleOnChangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="address">Address</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="address"
            value={address}
            onChange={handleOnChangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="avatar"
            value={avatar}
            onChange={handleOnChangeAvatar}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26,148,255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
