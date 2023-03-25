"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var contants_1 = require("../../Helpers/contants");
var baseQuery = (0, react_1.fetchBaseQuery)({
    baseUrl: contants_1.config.url.API_URL,
    prepareHeaders: function (headers, _a) {
        var getState = _a.getState;
        var token = getState().auth.token;
        if (token) {
            headers.set('authentication', "".concat(token));
        }
        return headers;
    },
});
var baseQueryWithRetry = (0, react_1.retry)(baseQuery, { maxRetries: 3 });
exports.api = (0, react_1.createApi)({
    reducerPath: 'api',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['examTests'],
    endpoints: function () { return ({}); },
});
//# sourceMappingURL=api.js.map