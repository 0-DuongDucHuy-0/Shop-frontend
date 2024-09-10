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

const CardComponent = (props) => {
  // key={product._id}
  // countInStock={product.countInStock}
  // description={product.description}
  // image={product.image}
  // name={product.name}
  // price={product.price}
  // rating={product.rating}
  // type={product.type}
  // discount={product.discount}
  //                 selled={product.selled}

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
  } = props;

  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
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
