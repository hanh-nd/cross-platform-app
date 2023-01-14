import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../screens/auth/reducers/auth.reducer';
import homeReducer from '../../screens/home/reducers/home.reducer';
import notificationReducer from '../../screens/notification/reducers/notification.reducer';
import postDetailReducer from '../../screens/post-detail/reducers/post-detail.reducer';
import friendReducer from '../../screens/profile/reducers/friend.reducer';
import searchReducer from '../../screens/search/reducers/search.reducer';

function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            home: homeReducer,
            postDetail: postDetailReducer,
            friend: friendReducer,
            search: searchReducer,
            notification: notificationReducer,
        },
    });
}
export const store = makeStore();
