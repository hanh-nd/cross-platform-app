import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getChats,
    getMessages,
    getMessagesByFriend,
} from '../../../services/chat.api';

const initialState = {
    chatList: [],
    messageList: [],
    isLoading: false,
};

export const fetchChatList = createAsyncThunk(
    'chat/fetchChatList',
    async () => {
        return await getChats();
    },
);

export const fetchMessageList = createAsyncThunk(
    'chat/fetchMessageList',
    async (chatId) => {
        return await getMessages(chatId);
    },
);

export const fetchMessageListByFriend = createAsyncThunk(
    'chat/fetchMessageListByFriend',
    async (friendId) => {
        return await getMessagesByFriend(friendId);
    },
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChatList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchChatList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chatList = action.payload?.data || [];
        });
        builder.addCase(fetchMessageList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessageList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messageList = action.payload?.data || [];
        });
        builder.addCase(fetchMessageListByFriend.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessageListByFriend.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messageList = action.payload?.data || [];
        });
    },
});

export const selectChatList = (state) => state.chat.chatList;
export const selectMessageList = (state) => state.chat.messageList;
export const selectIsLoading = (state) => state.chat.isLoading;

export default chatSlice.reducer;
