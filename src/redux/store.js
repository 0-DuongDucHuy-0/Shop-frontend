import { compose, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlide";
import userReducer from "./slides/userSlide";

export const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
