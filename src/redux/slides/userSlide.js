import { createSlice, isPending } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  access_token: "",
  avatar: "",
  id: "",
  isAdmin: false,
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
        _id = "",
        isAdmin,
      } = action.payload;
      console.log("first11");
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
      state.id = _id;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.id = "";
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlider.actions;

export default userSlider.reducer;
