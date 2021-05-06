import { configureStore } from '@reduxjs/toolkit';
import productsPreviewReducer from '../components/productPreview/productsPreviewSlice';

export const store = configureStore({
	reducer: {
		productsPreview: productsPreviewReducer,
	},
});
