import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cartLogic/cartSlice'

export default configureStore({
  reducer: {
    cart: cartReducer
  }
})