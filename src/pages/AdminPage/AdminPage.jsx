import { Menu } from "antd";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getItem } from "../../utils";
import AdminListUser from "../../components/AdminListUser/AdminListUser";
import AdminListProduct from "../../components/AdminListProduct/AdminListProduct";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <AppstoreOutlined />),
    getItem("Sản phẩm", "product", <MailOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");
  console.log(keySelected);

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminListUser />;
      case "product":
        return <AdminListProduct />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <div style={{ display: "flex" }}>
      <Menu
        mode="inline"
        style={{
          width: 256,
          boxShadow: "1px 1px 2px #ccc",
          height: "100vh",
        }}
        items={items}
        onClick={handleOnClick}
      />
      <div style={{ flex: 1, padding: "20px" }}>{renderPage(keySelected)}</div>
    </div>
  );
};

export default AdminPage;
