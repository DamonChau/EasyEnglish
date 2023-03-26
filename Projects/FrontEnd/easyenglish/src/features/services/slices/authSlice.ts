import { createSlice } from '@reduxjs/toolkit'
import { examTestsApi } from '../../examTests/examTests'
import type { Users } from '../../interfaces/interfaces'
import type { RootState } from '../'

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
} as { user: null | Users; token: string | null; isAuthenticated: boolean }

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(examTestsApi.endpoints.login.matchPending, (state, action) => {
                console.log('pending', action)
            })
            .addMatcher(examTestsApi.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled', action)
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addMatcher(examTestsApi.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action)
            })
    },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated

export const selectLoggedUser = (state: RootState) =>
    state.auth.user