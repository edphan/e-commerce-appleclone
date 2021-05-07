import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import productsPreviewReducer from '../components/productPreview/productsPreviewSlice';
import subcategoryReducer from '../components/subcategory/subcategorySlice';
import bagReducer from '../components/bag/bagSlice';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['bag'],
};

const reducers = combineReducers({
	productsPreview: productsPreviewReducer,
	subcategory: subcategoryReducer,
	bag: bagReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);
