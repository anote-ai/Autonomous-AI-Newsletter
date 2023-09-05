import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './../redux/UserSlice';
import { profileSlice } from './../redux/ProfileSlice';
import { sequenceSlice } from '../redux/SequenceSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    userReducer: userSlice.reducer,
    profileReducer: profileSlice.reducer,
    sequenceReducer: sequenceSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);