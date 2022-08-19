import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const APP_URL = process.env.REACT_APP_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: APP_URL
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    const baseQuery = await fetchBaseQuery({
        baseUrl: APP_URL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                headers.set('x-access-token', accessToken)
            }

            return headers
        }
    });
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        console.log('Unauthorized');
    }

    return result;
}

export {
    baseQuery,
    baseQueryWithReAuth
}