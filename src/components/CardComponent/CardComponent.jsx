import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPiceText,
  WrapperReporText,
  WrapperStyleTextSell,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const {
    key,
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;

  const navigator = useNavigate();
  const handleDetailProduct = (id) => {
    navigator(`/product-details/${id}`);
  };

  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReporText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating} </span>{" "}
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 100}+</WrapperStyleTextSell>
      </WrapperReporText>
      <WrapperPiceText>
        <span style={{ marginRight: "8px" }}>{price}đ</span>
        <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPiceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
