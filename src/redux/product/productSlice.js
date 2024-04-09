import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    cart: [],
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload;
        },
        getProductsStart: (state) => {
            state.products = null;
            state.loading = true;
            state.error = null;
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProductsFailure: (state, action) => {
            state.products = null;
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { updateCart, getProductsStart, getProductsSuccess, getProductsFailure } = productSlice.actions;

export default productSlice.reducer;