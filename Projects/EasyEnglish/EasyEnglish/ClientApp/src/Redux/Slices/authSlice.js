"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectLoggedUser = exports.selectIsAuthenticated = exports.logout = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var examTests_1 = require("../Services/examTests");
var initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};
var slice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: function () { return initialState; },
    },
    extraReducers: function (builder) {
        builder
            .addMatcher(examTests_1.examTestsApi.endpoints.login.matchPending, function (state, action) {
            console.log('pending', action);
        })
            .addMatcher(examTests_1.examTestsApi.endpoints.login.matchFulfilled, function (state, action) {
            console.log('fulfilled', action);
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        })
            .addMatcher(examTests_1.examTestsApi.endpoints.login.matchRejected, function (state, action) {
            console.log('rejected', action);
        });
    },
});
exports.logout = slice.actions.logout;
exports.default = slice.reducer;
var selectIsAuthenticated = function (state) {
    return state.auth.isAuthenticated;
};
exports.selectIsAuthenticated = selectIsAuthenticated;
var selectLoggedUser = function (state) {
    return state.auth.user;
};
exports.selectLoggedUser = selectLoggedUser;
//# sourceMappingURL=authSlice.js.map