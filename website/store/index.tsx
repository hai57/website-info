/* eslint-disable prettier/prettier */
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { authorizeAction } from './action/authorizeAction'
import { selfAction } from './action/selfAction'
import { roleAction } from './action/setRole'

const rootReducer = combineReducers({
  authorizeAction: authorizeAction.reducer,
  selfAction: selfAction.reducer,
  roleAction: roleAction.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
