import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createComment,
    getCommentList,
    getDetail,
} from '../services/post-detail.api';

const initialState = {
    post: {},
    comments: [],
    isLoading: false,
};

export const getPostDetail = createAsyncThunk(
    'postDetail/getPostDetail',
    async (postId) => {
        return await getDetail(postId);
    }
);

export const getPostComments = createAsyncThunk(
    'postDetail/getPostComments',
    async (postId) => {
        return await getCommentList(postId);
    }
);

export const createPostComment = createAsyncThunk(
    'postDetail/createPostComment',
    async ({ postId, body }) => {
        return await createComment(postId, body);
    }
);

export const postDetailSlice = createSlice({
    name: 'postDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPostDetail.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPostDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload?.data || {};
        });
        builder.addCase(getPostComments.fulfilled, (state, action) => {
            state.comments = action.payload?.data || [];
        });
    },
});

export const selectPostDetail = (state) => state.postDetail.post;
export const selectPostComments = (state) => state.postDetail.comments;
export const selectIsLoading = (state) => state.postDetail.isLoading;

export default postDetailSlice.reducer;
