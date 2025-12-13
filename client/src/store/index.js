import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import workerReducer from './workerSlice';
import jobReducer from './jobSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        worker: workerReducer,
        jobs: jobReducer,
    },
});
