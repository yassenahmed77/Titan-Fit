import { createSlice } from '@reduxjs/toolkit';
const getItemsFromLocalStorage = () => {
    try {
        const items = localStorage.getItem("cartItems");
        return items ? JSON.parse(items) : []
    } catch {
        return [];
    }
}
const initialState = {
    cartItems: getItemsFromLocalStorage()
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cartItems.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.cartItems.push({ ...product, quantity: product.quantity });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity--
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        }
    }
});
export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;