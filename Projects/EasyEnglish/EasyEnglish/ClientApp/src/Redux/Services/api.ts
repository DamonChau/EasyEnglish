﻿import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { config } from '../../Helpers/contants'
import { RootState } from '../Stores'

const baseQuery = fetchBaseQuery({
    baseUrl: config.url.API_URL,
    prepareHeaders: (headers, { getState }) => {
        
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authentication', `${token}`)
        }
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 })

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['examTests'],
    endpoints: () => ({}),
})