"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteExamTestMutation = exports.useUpdateExamTestMutation = exports.useAddExamTestMutation = exports.useGetExamTestQuery = exports.useGetExamTestsQuery = exports.useLoginMutation = exports.examTestsApi = void 0;
var api_1 = require("./api");
exports.examTestsApi = api_1.api.injectEndpoints({
    endpoints: function (build) { return ({
        login: build.mutation({
            query: function (credentials) { return ({
                url: '/api/Users/login',
                method: 'POST',
                body: credentials,
            }); },
        }),
        getExamTests: build.query({
            query: function () { return ({ url: 'api/ExamTests/GetAll' }); },
            providesTags: function (result) {
                if (result === void 0) { result = []; }
                return __spreadArray(__spreadArray([], result.map(function (_a) {
                    var id = _a.id;
                    return ({ type: 'examTests', id: id });
                }), true), [
                    { type: 'examTests', id: 'LIST' },
                ], false);
            },
        }),
        getExamTest: build.query({
            query: function (id) { return "api/ExamTests/Details/".concat(id); },
            providesTags: function (result, error, arg) { return [{ type: 'examTests', id: arg }]; },
        }),
        addExamTest: build.mutation({
            query: function (body) { return ({
                url: 'api/ExamTests/Create',
                method: 'POST',
                body: body,
            }); },
            invalidatesTags: [{ type: 'examTests', id: 'LIST' }],
        }),
        updateExamTest: build.mutation({
            query: function (data) {
                var id = data.id, body = __rest(data, ["id"]);
                return {
                    url: "api/ExamTests/Edit/".concat(id),
                    method: 'PUT',
                    body: body,
                };
            },
            invalidatesTags: function (examTests) { return [{ type: 'examTests', id: examTests === null || examTests === void 0 ? void 0 : examTests.id }]; },
        }),
        deleteExamTest: build.mutation({
            query: function (id) {
                return {
                    url: 'api/ExamTests/Delete/${id}',
                    method: 'DELETE',
                };
            },
            invalidatesTags: function (examTests) { return [{ type: 'examTests', id: examTests === null || examTests === void 0 ? void 0 : examTests.id }]; },
        }),
    }); },
});
exports.useLoginMutation = exports.examTestsApi.useLoginMutation, exports.useGetExamTestsQuery = exports.examTestsApi.useGetExamTestsQuery, exports.useGetExamTestQuery = exports.examTestsApi.useGetExamTestQuery, exports.useAddExamTestMutation = exports.examTestsApi.useAddExamTestMutation, exports.useUpdateExamTestMutation = exports.examTestsApi.useUpdateExamTestMutation, exports.useDeleteExamTestMutation = exports.examTestsApi.useDeleteExamTestMutation;
//export const {
//    endpoints: { login },
//} = examTestsApi
//# sourceMappingURL=examTests.js.map