import { configureStore } from '@reduxjs/toolkit'
import appSliceReducer from './app/appSlice'

export const store = configureStore({
  reducer: {
    app: appSliceReducer,
  },
})
