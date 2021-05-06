import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadAllProducts = createAsyncThunk('productsPreview/loadAllProducts', async () => {
	const response = await fetch('http://localhost:5000/products/subcategory');
	const json = await response.json();

	return json;
});

export const productsPreviewSlice = createSlice({
	name: 'productsPreview',
	initialState: {
		products: [],
		categories: [],
		isProductsLoaded: false,
		isLoadingProducts: false,
		failedToLoadProducts: false,
	},
	extraReducers: {
		// loadAllProducts async call
		[loadAllProducts.pending]: (state, action) => {
			state.isLoadingProducts = true;
			state.failedToLoadProducts = false;
			state.isProductsLoaded = false;
		},
		[loadAllProducts.fulfilled]: (state, action) => {
			state.isLoadingProducts = false;
			state.failedToLoadProducts = false;
			state.isProductsLoaded = true;
			state.products = action.payload;
		},
		[loadAllProducts.rejected]: (state, action) => {
			state.isLoadingProducts = false;
			state.failedToLoadProducts = true;
			state.isProductsLoaded = false;
		},
	},
});
// select isLoadingProducts state
export const isProductsLoaded = (state) => state.productsPreview.isProductsLoaded;

// select isLoadingProducts state
export const isLoadingProducts = (state) => state.productsPreview.isLoadingProducts;

// select all productsPreview state
export const selectProducts = (state) => state.productsPreview.products;

export default productsPreviewSlice.reducer;
