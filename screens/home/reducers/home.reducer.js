import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts, createPost } from '../services/home.api';

const initialState = {
    postList: [],
    isLoading: false,
};

export const fetchPostList = createAsyncThunk(
    'home/fetchPostList',
    async () => {
        return await getPosts();
    }
);

export const createNewPost = createAsyncThunk(
    'home/createNewPost',
    async (body) => {
        return await createPost(body);
    }
);

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPostList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postList = action.payload?.data || [];
        });
    },
});

export const selectPostList = (state) => state.home.postList;

export default homeSlice.reducer;
