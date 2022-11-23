import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth.api';
import { setAccessToken } from '../../../plugins/axios/axios';

const initialState = {
    isLoggedIn: false,
    loginUser: {},
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
        setLoginUser: (state, action) => {
            state.loginUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loginUser = action.payload?.data || {};
            setAccessToken(action.payload?.token);
        });
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.loginUser = action.payload?.data || {};
            setAccessToken(action.payload?.token);
        });
        builder.addCase(handleLogout.fulfilled, (state, action) => {
            state.loginUser = {};
            setAccessToken('');
        });
    },
});

export const { setIsLoggedIn, setLoginUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoginUser = (state) => state.auth.loginUser;

export default authSlice.reducer;
