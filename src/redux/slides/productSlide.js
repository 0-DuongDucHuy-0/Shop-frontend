import { compose, createSlice } from "@reduxjs/toolkit";

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const initialState = {
  search: "",
};

export const productSlice = createSlice(
  {
    name: "product",
    initialState,
    reducers: {
      searchProduct: (state, action) => {
        state.search = action.payload;
      },
    },
  },
  enhancers
);

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlice.actions;

export default productSlice.reducer;
