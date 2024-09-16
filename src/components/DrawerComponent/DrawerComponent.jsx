import { Drawer } from "antd";
import React from "react";

const DrawerComponent = ({
  title = "drawer",
  placement = "right",
  isOpen = false,
  children,
  ...rests
}) => {
  return (
    <>
      <Drawer title={title} placement={placement} open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
