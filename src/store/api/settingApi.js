import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_ADMIN_URL;

export const settingApi = createApi({
    reducerPath: 'settingApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => ({
                url: `/settings`,
            }),
        }),
        updateSetting: builder.mutation({
            query: ({ max_pledge_amount, max_loan_amount, penalty_fee, commission_fee, }) => ({
                url: `/settings`,
                method: 'PUT',
                body: { max_pledge_amount, max_loan_amount, penalty_fee, commission_fee, }
            }),
        }),
    }),
})

export const {
    useGetSettingsQuery,
    useUpdateSettingMutation
} = settingApi