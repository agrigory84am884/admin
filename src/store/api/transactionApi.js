import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_ADMIN_URL;

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (options = {}) => ({
                url: `/transactions`,
                params: {
                    orderField: options.orderField,
                    orderDirection: options.orderDirection,
                    limit: options.limit,
                    page: options.page,
                    search: options.search
                }
            }),
        }),
    }),
})

export const { useGetTransactionsQuery } = transactionApi