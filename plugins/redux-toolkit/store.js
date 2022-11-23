import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';

function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
        },
    });
}
export const store = makeStore();
