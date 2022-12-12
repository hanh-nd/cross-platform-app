import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';
import homeReducer from '../../screens/home/reducers/home.reducer';
import postDetailReducer from '../../screens/post-detail/reducers/post-detail.reducer';

function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            home: homeReducer,
            postDetail: postDetailReducer,
        },
    });
}
export const store = makeStore();
