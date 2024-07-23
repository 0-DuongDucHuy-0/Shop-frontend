import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPiceText, WrapperReporText } from "./style";
import { StarFilled } from '@ant-design/icons'

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
        <StyleNameProduct>Trứng vịt</StyleNameProduct>
        <WrapperReporText>
            <span style={{ marginRight: '4px' }}>
                <span>4.96 </span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
            </span>
            <span> | Đã bán 1000+</span>
        </WrapperReporText>
        <WrapperPiceText>
            1.000.000đ
            <WrapperDiscountText>
                -5%
            </WrapperDiscountText>
        </WrapperPiceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
