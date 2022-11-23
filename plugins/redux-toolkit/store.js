import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
