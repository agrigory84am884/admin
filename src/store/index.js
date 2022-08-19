import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {userApi} from "./api/userApi";
import {transactionApi} from "./api/transactionApi";
import {loanTypeApi} from "./api/loanTypeApi";
import {authApi} from "./api/authApi";
import {authReducer} from "./reducers/authSlice";


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [loanTypeApi.reducerPath]: loanTypeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    authReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            userApi.middleware,
            transactionApi.middleware,
            loanTypeApi.middleware,
            authApi.middleware
        )
    },
    devTools: true
});

setupListeners(store.dispatch);