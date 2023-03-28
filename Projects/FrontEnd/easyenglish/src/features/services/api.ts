import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { config } from '../helpers/contants'
import { RootState } from '../services'

const baseQuery = fetchBaseQuery({
    baseUrl: config.url.API_URL,
    credentials: "same-origin",
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
        
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authentication', `${token}`)
            headers.set('Content-Type', 'application/json')
            headers.set('Accept', 'application/json')
            headers.set('Origin', config.url.API_URL)
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