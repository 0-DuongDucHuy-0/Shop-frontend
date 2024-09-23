import React, { useMemo } from "react";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperLeft,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { Button, Checkbox, Image } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperListOrder } from "./style";
import { WrapperItemOrder } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperInputNumber } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderAllProduct,
  removeOrderProduct,
} from "../../redux/slides/orderSlider";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const onChange = (e) => {
    console.log("check", e.target.value);
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === "decrease") {
      dispatch(decreaseAmount({ idProduct }));
    } else {
      dispatch(increaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleDeleteAllOrder = () => {
    dispatch(removeOrderAllProduct());
  };

  const handleOnChangeCheckAll = (e) => {};

  const priceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 100000) {
      return 20000;
    } else {
      return 10000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return priceMemo + diliveryPriceMemo;
  }, [priceMemo, diliveryPriceMemo]);

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox onChange={handleOnChangeCheckAll}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteAllOrder()}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Checkbox onChange={onChange}></Checkbox>
                      <Image
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      ></Image>
                      <div>{order?.name}</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {order?.price.toLocaleString("it-IT")}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <Button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("decrease", order?.product)
                          }
                        >
                          <MinusOutlined
                            style={{ fontSize: "10px", cursor: "pointer" }}
                          />
                        </Button>
                        <WrapperInputNumber
                          onChange={onChange}
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                        ></WrapperInputNumber>
                        <Button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", order?.product)
                          }
                        >
                          <PlusOutlined
                            style={{ fontSize: "10px", cursor: "pointer" }}
                          />
                        </Button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255,66,78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {(order?.price * order?.amount).toLocaleString("it-IT")}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                    {priceMemo.toLocaleString("it-IT")} VND
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                    0 %
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {diliveryPriceMemo.toLocaleString("it-IT")} VND
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254,56,52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalPriceMemo.toLocaleString("it-IT")}
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
