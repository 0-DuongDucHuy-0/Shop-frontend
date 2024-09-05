import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  access_token: ''
}

export const userSlider = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const { name, email, access_token} = action.payload
        console.log('first', action)
        state.name = name || email
        state.email = email
        state.access_token = access_token
    },
  },
})

export const { updateUser } = userSlider.actions

export default userSlider.reducer