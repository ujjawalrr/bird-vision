import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error: null,
    loading: false,
};

const productSlice = createSlice ({
    name: 'product',
    initialState,
    reducers: {
        getProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { getProductsStart, getProductsSuccess, getProductsFailure } = productSlice.actions;

export default productSlice.reducer;