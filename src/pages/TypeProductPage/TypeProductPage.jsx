import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductServices from "../../services/ProductServices";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const fetchProductType = async (type) => {
    const res = await ProductServices.getProductType(type);
    if (res?.status === "OK") {
      setProducts(res?.data);
    }
    console.log("res", res);
  };

  console.log("products", products);

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);

  const onChange = () => {};
  return (
    <div style={{ width: "100%", background: "#efefef" }}>
      <div
        style={{ padding: "0 120px", background: "#efefef", margin: "0 auto" }}
      >
        <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
          <WrapperNavbar span={4}>
            <NavBarComponent />
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts>
              {products?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    discount={product.discount}
                    selled={product.selled}
                    id={product._id}
                  />
                );
              })}
            </WrapperProducts>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{ textAlign: "center", margin: "10px" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TypeProductPage;
