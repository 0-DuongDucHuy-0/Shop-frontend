import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imageProduct from "../../assets/images/test.webp";
import imageProductSmall from "../../assets/images/testSmall.webp";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleSmail,
  WrapperStyleTextSell,
} from "./style";
import {
  StarFilled,
  PlusOutlined,
  MinusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductServices from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlider";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleAddOderProduct = () => {
    if (user?.id.length === 0) {
      navigator("/sign-in");
    } else {
      // name: { type: String, required: true },
      // amount: { type: Number, required: true },
      // image: { type: String, required: true },
      // price: { type: Number, required: true },
      // product: {
      //   type: momgoose.Schema.Types.ObjectId,
      //   ref: "Product",
      //   required: true,
      // },
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetail?.name,
            amount: Number(numProduct),
            image: productDetail?.image,
            price: productDetail?.price,
            product: productDetail?._id,
          },
        })
      );
    }
  };

  const onChange = (e) => {
    setNumProduct(Number(e));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductServices.getDetailsProduct(id);
      return res.data;
    }
  };

  const { isLoading, data: productDetail } = useQuery({
    queryKey: ["product-details", idProduct], // Query key
    queryFn: fetchGetDetailsProduct, // Fetch function
    retry: 3, // Retry the query up to 3 times on failure
    retryDelay: 1000, // Wait 1 second between retries
    keepPreviousData: true, // Keep previous data while fetching new data
    enabled: !!idProduct,
  });

  console.log("user", user, productDetail);

  //   const renderStars = (filledStars, totalStars = 5) => {
  //     const stars = [];

  //     // Thêm sao đã lấp đầy
  //     for (let i = 1; i < filledStars; i++) {
  //       stars.push(
  //         <StarFilled style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }} />
  //       );
  //     }

  //     // Thêm sao chưa lấp đầy (nếu totalStars > filledStars)
  //     for (let i = filledStars; i < totalStars; i++) {
  //       stars.push(<StarOutlined style={{ fontSize: "12px", color: "#ccc" }} />);
  //     }

  //     return stars; // Trả về mảng các phần tử JSX
  //   };

  const handleChangCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  return (
    <Loading isPending={isLoading}>
      <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
        <Col span={10} style={{ paddingRight: "10px" }}>
          <Image
            src={productDetail?.image}
            alt="image product"
            preview={false}
          />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleSmail
                src={imageProductSmall}
                alt="imageProductSmall"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleSmail
                src={imageProductSmall}
                alt="imageProductSmall"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleSmail
                src={imageProductSmall}
                alt="imageProductSmall"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleSmail
                src={imageProductSmall}
                alt="imageProductSmall"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleSmail
                src={imageProductSmall}
                alt="imageProductSmall"
                preview={false}
              />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {productDetail?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              disabled
              defaultValue={5}
              value={Math.round(productDetail?.rating * 2) / 2}
              style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
            />
            <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {productDetail?.price}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">{user?.address}</span>
            <span className="change-add">đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div style={{ margin: "10px 0 20px", padding: "10px 0" }}>
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <MinusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangCount("decrease")}
                />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangCount("increase")}
                />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "220px",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={handleAddOderProduct}
              textButton={"Chọn mua"}
              styleTextButton={{ color: "#fff" }}
            ></ButtonComponent>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13, 92, 182)",
                borderRadius: "4px",
              }}
              textButton={"Mua trả sau"}
              styleTextButton={{ color: "rgb(13, 92, 182)" }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
