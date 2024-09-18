import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "../../services/UserServices";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { isPending } from "@reduxjs/toolkit";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponents = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [pending, setPending] = useState(false);
  const [search, setSearch] = useState("");
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };
  console.log("user", user);

  const handleLogout = async () => {
    setPending(true);
    await UserServices.logOutUser();
    dispatch(resetUser());
    setPending(false);
  };

  useEffect(() => {
    // setPending(true);
    console.log("user?.name", user?.name);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    // setPending(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContent onClick={handleLogout}>Đăng suất</WrapperContent>
      <WrapperContent onClick={() => navigate("/profile-user")}>
        Chỉnh sửa profile
      </WrapperContent>
      {user?.isAdmin && (
        <WrapperContent onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapperContent>
      )}
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
    console.log("e", e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26, 148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>ShopFood</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="input search text"
            onChange={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isPending={pending}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName || "User"}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateSignIn}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponents;
