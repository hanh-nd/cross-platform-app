import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    loginUser: {},
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setLoginUser: (state, action) => {
            state.loginUser = action.payload;
        },
    },
});

export const { setIsLoggedIn, setLoginUser } = appSlice.actions;

export const selectIsLoggedIn = (state) => state.app.isLoggedIn;
export const selectLoginUser = (state) => state.app.loginUser;

export default appSlice.reducer;
