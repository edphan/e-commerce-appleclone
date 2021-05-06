import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios').default;

export const loadSubcategory = createAsyncThunk('subcategory/loadSubcategory', async ({ category, subcategory }) => {
	try {
		const response = await axios.get(`/${category}/${subcategory}`);
		const json = response.data;

		return json;
	} catch (err) {
		console.log(err);
	}
});

export const subcategorySlice = createSlice({
	name: 'subcategory',
	initialState: {
		products: [],
		isLoadingSubcategory: false,
		failedToLoadSubcategory: false,
		isCategoryLoaded: false,
	},
	extraReducers: {
		[loadSubcategory.pending]: (state, action) => {
			state.isLoadingSubcategory = true;
			state.failedToLoadSubcategory = false;
		},
		[loadSubcategory.fulfilled]: (state, action) => {
			state.isLoadingSubcategory = false;
			state.failedToLoadSubcategory = false;
			state.isCategoryLoaded = true;
			state.products = action.payload;
		},
		[loadSubcategory.rejected]: (state, action) => {
			state.isLoadingSubcategory = false;
			state.failedToLoadSubcategory = true;
		},
	},
});

export const selectIsCategoryLoaded = (state) => state.subcategory.isCategoryLoaded;

export const selectCategoryProducts = (state) => state.subcategory.products;

export default subcategorySlice.reducer;
