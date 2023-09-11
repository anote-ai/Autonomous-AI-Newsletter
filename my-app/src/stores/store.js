import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './../redux/UserSlice';
import { detailSlice } from './../redux/DetailSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    userReducer: userSlice.reducer,
    detailReducer: detailSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);