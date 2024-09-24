import React, { useEffect, useMemo, useState } from "react";
import * as message from "../../components/Message/Message";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperLeft,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
} from "./style";
import { Button, Checkbox, Image, Radio } from "antd";
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
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderServices from "../../services/OrderServices";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [payment, setPayment] = useState(null);
  const dispatch = useDispatch();

  // const stateUserDetails = {
  //   name: user?.name,
  //   phone: user?.phone,
  //   address: user?.address,
  // };

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
    if (priceMemo === 0) {
      return 0;
    } else {
      return priceMemo + diliveryPriceMemo;
    }
  }, [priceMemo, diliveryPriceMemo]);

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderServices.createOrder(token, { ...rests });
    return res;
  });

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItems &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.id &&
      priceMemo
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalsPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;
  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      message.success("Đặt hàng thành công");
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnChangePayment = (e) => {
    setPayment(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  console.log("orderC", order);
  console.log("userC", user);

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Chọn phương thức giao hàng
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Radio.Group name="deliveryMethod">
                    {" "}
                    {/* Added Radio.Group to ensure only one option can be selected */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                      }}
                    >
                      <Radio
                        value="fast"
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#ea8500",
                            fontWeight: "bold",
                            marginRight: "8px",
                          }}
                        >
                          FAST
                        </span>
                        Giao hàng tiết kiệm
                      </Radio>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                      }}
                    >
                      <Radio
                        value="gojek"
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#ea8500",
                            fontWeight: "bold",
                            marginRight: "8px",
                          }}
                        >
                          GO_JEK
                        </span>
                        Giao hàng tiết kiệm
                      </Radio>
                    </div>
                  </Radio.Group>{" "}
                  {/* End of Radio.Group */}
                </div>
              </WrapperInfo>
            </div>

            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Chọn phương thức thanh toán
                </div>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Radio.Group
                    onChange={handleOnChangePayment} // onChange handler to update the payment state
                    value={payment} // Controlled component, payment state reflects the selected value
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <Radio
                      value="later_money"
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      Thanh toán khi nhận hàng
                    </Radio>
                  </Radio.Group>
                </div>
              </WrapperInfo>
            </div>
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
              textButton={"Đặt hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "bold",
              }}
              onClick={() => handleAddOrder()}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
