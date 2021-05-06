import { configureStore } from '@reduxjs/toolkit';
import productsPreviewReducer from '../components/productPreview/productsPreviewSlice';
import subcategoryReducer from '../components/subcategory/subcategorySlice';

export const store = configureStore({
	reducer: {
		productsPreview: productsPreviewReducer,
		subcategory: subcategoryReducer,
	},
});
