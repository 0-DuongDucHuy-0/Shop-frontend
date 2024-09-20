import { compose, createSlice } from "@reduxjs/toolkit";

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalsPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice(
  {
    name: "order",
    initialState,
    reducers: {
      addOrderProduct: (state, action) => {
        const { orderItem } = action.payload;
        const itemOrder = state?.orderItems?.find(
          (item) => item?.product === orderItem.product
        );
        if (itemOrder) {
          itemOrder.amount += orderItem?.amount;
        } else {
          state.orderItems.push(orderItem);
        }
      },

      decreaseAmount: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.find(
          (item) => item?.product === idProduct
        );
        itemOrder.amount--;
      },

      increaseAmount: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItems?.find(
          (item) => item?.product === idProduct
        );
        itemOrder.amount++;
      },

      removeOrderProduct: (state, action) => {
        const { idProduct } = action.payload;
        const itemOrder = state?.orderItem?.find(
          (item) => item?.product !== idProduct
        );
        itemOrder.orderItems = itemOrder;
      },
    },
  },
  enhancers
);

export const { addOrderProduct } = orderSlice.actions;

export default orderSlice.reducer;
