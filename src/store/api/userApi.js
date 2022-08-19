import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./index";

const baseUrl = process.env.REACT_APP_ADMIN_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (options = {}) => ({
                url: `/users`,
                params: {
                    orderField: options.orderField,
                    orderDirection: options.orderDirection,
                    limit: options.limit,
                    page: options.page,
                    search: options.search
                }
            }),
        }),
        getAuthUser: builder.query({
            query: () => ({
                url: '/users/get'
            })
        })
    }),
})

export const { useGetUsersQuery, useGetAuthUserQuery } = userApi