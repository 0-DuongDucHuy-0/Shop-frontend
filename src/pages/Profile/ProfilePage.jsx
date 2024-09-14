import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { Button, message } from "antd";
import { updateUser } from "../../redux/slides/userSlide";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [avatar, setAvatar] = useState(user?.avatar);

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserServices.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  console.log("data", data);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangeName = (value) => {
    setName(value);
  };

  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log("file.preview", file.preview);
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
    console.log("updateProfile", email, name, phone, address, avatar);
  };

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
      <Loading isPending={isPending}>
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
            <WrapperUploadFile onChange={handleOnChangeAvatar}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            {/* <InputForm
              style={{ width: "300px" }}
              id="avatar"
              value={avatar}
              onChange={handleOnChangeAvatar}
            /> */}
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
      </Loading>
    </div>
  );
};

export default ProfilePage;
