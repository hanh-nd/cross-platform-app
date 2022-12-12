import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';
import homeReducer from '../../screens/home/reducers/home.reducer';

function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            home: homeReducer,
        },
    });
}
export const store = makeStore();
