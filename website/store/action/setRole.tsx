/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const roleAction = createSlice({
  name: 'role',
  initialState: {
    userRole: {
      role: ''
    }
  },

  reducers: {
    setRole: (state, action: PayloadAction<{ role: string }>) => {
      state.userRole = {
        ...state.userRole,
        ...action.payload,
      };
    },
  }
})
export const { setRole } = roleAction.actions
export default roleAction.reducer
