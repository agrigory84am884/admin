import {createSlice} from "@reduxjs/toolkit";
import {setCookie} from "../../helpers/cookies";

const initialState = {
    isAuth: false,
    user: null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setTokens (state, action) {
            const {access_token, refresh_token, rememberMe} = action.payload;
            if (access_token) {
                localStorage.setItem('accessToken', access_token);
            }

            if (rememberMe && refresh_token) {
                setCookie('refreshToken', refresh_token, 5);
            }
        },

        setAuthUser (state, action) {
            state.isAuth = true;
            state.user = action.payload.payload;
        },

        deleteAuthUser (state) {
            state.isAuth = false;
        }
    }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;