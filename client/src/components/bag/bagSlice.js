import { createSlice } from '@reduxjs/toolkit';

const bagSlice = createSlice({
	name: 'bag',
	initialState: [],
	reducers: {
		addToBag: (state, action) => {
			const index = state.findIndex((product) => product.productInfo.id === action.payload.id);
			if (index === -1) {
				const item = {};
				item.productInfo = action.payload;
				item.quantity = 1;
				state.push(item);
			} else {
				state[index].quantity += 1;
			}
		},
		removeProduct: (state, action) => {
			const index = state.findIndex((product) => product.productInfo.id === action.payload);
			state.splice(index, 1);
		},

		addQuantity: (state, action) => {
			const index = state.findIndex((product) => product.productInfo.id === action.payload.productInfo.id);
			state[index].quantity += 1;
		},

		subtractQuantity: (state, action) => {
			const index = state.findIndex((product) => product.productInfo.id === action.payload.productInfo.id);
			state[index].quantity -= 1;
		},

		clearBag: (state, action) => {
			state.splice(0, state.length);
		},
	},
});

export const selectBag = (state) => state.bag;

export const { addToBag, removeProduct, addQuantity, subtractQuantity, clearBag } = bagSlice.actions;

export default bagSlice.reducer;
