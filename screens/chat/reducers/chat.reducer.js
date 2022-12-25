import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentFriendId: null,
    chatList: [],
    currentChatId: null,
    socket,
    currentBlockers: [],
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
});
