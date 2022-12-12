import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { acceptRequest, getFriendProfile, getFriendStatus, getRequestedFriends, listFriend, removeFriend, sendFriendRequest } from '../services/friend.api';
import { status } from '@constants'

const initialState = {
    friendList: [],
    requestList: [],
    blockList: [],
    targetUser: {},
    isLoading: false,
};

export const sendRequest = createAsyncThunk(
    'friend/sendFriendRequest',
    async (body) => {
        return await sendFriendRequest(body);
    }
);

export const getRequestedFriend = createAsyncThunk(
    'friend/getRequestedFriends',
    async (body) => {
        return await getRequestedFriends(body);
    }
);

export const acceptRequestFriend = createAsyncThunk(
    'friend/accept',
    async (body) => {
        return await acceptRequest(body);
    }
);

export const deleteFriend = createAsyncThunk(
    'friend/remove',
    async (body) => {
        return await removeFriend(body);
    }
);

export const getListFriends = createAsyncThunk(
    'friend/status',
    async () => {
        return await listFriend();
    }
);

export const getStatusFriend = createAsyncThunk(
    'friend/getListFriends',
    async (params) => {
        return await getFriendStatus(params);
    }
);

export const getUserProfile = createAsyncThunk(
    'friend/profile',
    async (params) => {
        return await getFriendProfile(params);
    }
);

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListFriends.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getListFriends.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendList = action.payload?.data?.friends || [];
        });
        builder.addCase(getUserProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.targetUser = action.payload?.data || {};
        });
        builder.addCase(getStatusFriend.fulfilled, (state, action) => {
            state.targetUser.status = action.payload?.data?.satus || status.NOT_FRIEND;
        });
    },
});

export const selectFriendList = (state) => state.friend.friendList;
export const selectFriendProfile = (state) => state.friend.targetUser;
export const selectIsLoading = (state) => state.friend.isLoading;

export default friendSlice.reducer;
