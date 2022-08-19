import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_ADMIN_URL;

export const loanTypeApi = createApi({
    reducerPath: 'loanTypeApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['LoanTypes'],
    endpoints: (builder) => ({
        getLoanTypes: builder.query({
            query: (options = {}) => ({
                url: `/loan-types`,
                params: {
                    orderField: options.orderField,
                    orderDirection: options.orderDirection,
                    limit: options.limit,
                    page: options.page,
                    search: options.search
                }
            }),
            providesTags: ['LoanTypes']
        }),
        createLoanType: builder.mutation({
            query: (loanType) => ({
                url: '/loan-types',
                method: 'POST',
                body: loanType
            }),
            invalidatesTags: ['LoanTypes']
        }),
        getLoanType: builder.query({
            query: (id) => ({
                url: `/loan-types/${id}`
            }),
            providesTags: ['LoanTypes']
        }),
        updateLoanType: builder.mutation({
            query: ({id, loanType}) => ({
                url: `/loan-types/${id}`,
                method: 'PUT',
                body: loanType
            }),
            invalidatesTags: ['LoanTypes']
        }),
        deleteLoanType: builder.mutation({
            query: (id) => ({
                url: `/loan-types/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['LoanTypes']
        })
    }),
})

export const {
    useGetLoanTypesQuery,
    useCreateLoanTypeMutation,
    useGetLoanTypeQuery,
    useUpdateLoanTypeMutation,
    useDeleteLoanTypeMutation
} = loanTypeApi