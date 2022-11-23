import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth.api';

const initialState = {
    isLoggedIn: false,
    loginUser: {},
    isLoading: false,
};

export const handleLogin = createAsyncThunk('auth/login', async (body) => {
    return await login(body);
});

export const handleRegister = createAsyncThunk(
    'auth/register',
    async (body) => {
        return await register(body);
    }
);

export const handleLogout = createAsyncThunk('auth/logout', async () => {
    return await logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.pending, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = true;
        });
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loginUser = action.payload?.data || {};
        });
        builder.addCase(handleRegister.pending, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = true;
        });
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loginUser = action.payload?.data || {};
        });
        builder.addCase(handleLogout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.loginUser = {};
        });
    },
});

export const { setIsLoggedIn } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoginUser = (state) => state.auth.loginUser;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
