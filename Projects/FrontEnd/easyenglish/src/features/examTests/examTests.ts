/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../services/api'
import { ExamTests, Users } from '../interfaces/interfaces'
type ExamTestsResponse = ExamTests[]

export const examTestsApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{ token: string; user: Users }, any>({
            query: (credentials: any) => ({
                url: '/api/Users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getExamTests: build.query<ExamTestsResponse, void>({
            query: () => ({ url: 'api/ExamTests/GetAll' }),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'examTests', id } as const)),
                { type: 'examTests' as const, id: 'LIST' },
            ],
        }),
        getExamTest: build.query<ExamTests, string>({
            query: (id) => `api/ExamTests/Details/${id}`,
            providesTags: (result, error, arg) => [{ type: 'examTests', id: arg }],
        }),
        addExamTest: build.mutation<ExamTests, Partial<ExamTests>>({
            query: (body) => ({
                url: 'api/ExamTests/Create',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'examTests', id: 'LIST' }],
        }),
        updateExamTest: build.mutation<ExamTests, Partial<ExamTests>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `api/ExamTests/Edit/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (examTests) => [{ type: 'examTests', id: examTests?.id }],
        }),
        deleteExamTest: build.mutation<{ success: boolean; id: string }, string>({
            query(id) {
                return {
                    url: `api/ExamTests/Delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (examTests) => [{ type: 'examTests', id: examTests?.id }],
        }),
    }),
})

export const {
    useLoginMutation,
    useGetExamTestsQuery,
    useGetExamTestQuery,
    useAddExamTestMutation,
    useUpdateExamTestMutation,
    useDeleteExamTestMutation,
} = examTestsApi
