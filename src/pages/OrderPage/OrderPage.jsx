import React from "react";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperLeft,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { Button, Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperListOrder } from "./style";
import { WrapperItemOrder } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const OrderPage = ({ count = 1 }) => {
  const onChange = (e) => {
    console.log("check", e.target.value);
  };

  const handleChangeCount = () => {};

  const handleOnChangeCheckAll = (e) => {};

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox onChange={handleOnChangeCheckAll}></Checkbox>
                <span> Tất cả ({count} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div
                  style={{
                    width: "390px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox onChange={onChange}></Checkbox>
                  <image
                    src={""}
                    style={{ width: "77px", height: "79px", objectFit: "fill" }}
                  ></image>
                  <div>name sản phẩm</div>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <span>
                    <span style={{ fontSize: "13px", color: "#242424" }}>
                      211
                    </span>
                    <WrapperPriceDiscount>230</WrapperPriceDiscount>
                  </span>
                  <WrapperCountOrder>
                    <Button
                      style={{ border: "none", background: "transparent" }}
                    >
                      <MinusOutlined
                        style={{ fontSize: "10px", cursor: "pointer" }}
                      />
                    </Button>
                    <div>123</div>
                    <Button
                      style={{ border: "none", background: "transparent" }}
                    >
                      <PlusOutlined
                        style={{ fontSize: "10px", cursor: "pointer" }}
                      />
                    </Button>
                  </WrapperCountOrder>
                  <span
                    style={{ color: "rgb(255,66,78)", fontSize: "13px" }}
                  ></span>
                  <DeleteOutlined style={{ cursor: "pointer" }} />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    500 đồng
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    5 %
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  abc123
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent>
              size={40}
              styleButton=
              {{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Mua hàng"}
              styleTextButton=
              {{ color: "#fff", fontSize: "15px", fontWeight: "bold" }}
            </ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
