/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const selfAction = createSlice({
  name: 'self',
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
    }
  },

  reducers: {
    setSelf: (state, action: PayloadAction<{ id: string; username: string; email: string; }>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  }
})
export const { setSelf } = selfAction.actions
export default selfAction.reducer
