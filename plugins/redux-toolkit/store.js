import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';
import homeReducer from '../../screens/home/reducers/home.reducer';
import postDetailReducer from '../../screens/post-detail/reducers/post-detail.reducer';
import friendReducer from '../../screens/profile/reducers/friend.reducer';

function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            home: homeReducer,
            postDetail: postDetailReducer,
            friend: friendReducer,
        },
    });
}
export const store = makeStore();
