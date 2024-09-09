import { createSlice, isPending } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  access_token: "",
  avatar: "",
  // isPending: false,
};

export const userSlider = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        access_token = "",
        phone = "",
        address = "",
        avatar = "",
      } = action.payload;
      console.log("first", action);
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
    },
  },
});

export const { updateUser, resetUser } = userSlider.actions;

export default userSlider.reducer;
