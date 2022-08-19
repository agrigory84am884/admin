import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user
            })
        })
    }),
})

export const {
    useLoginMutation
} = authApi;