import { createSlice, isPending } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  access_token: "",
  // isPending: false,
};

export const userSlider = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token } = action.payload;
      console.log("first", action);
      state.name = name || email;
      state.email = email;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlider.actions;

export default userSlider.reducer;
