import React from "react";
import { WrapperHeader } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableComponent from "../TableComponent/TableComponent";

const AdminListUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "12px",
            borderStyle: "dotted",
          }}
        >
          <PlusOutlined style={{ fontSize: "50px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "15px" }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminListUser;
