/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from "msw";
import { faker } from '@faker-js/faker';
import { LoginType, Status, UserType, Users } from "../../models/types";

const API_URL = "http://localhost:5097";

export const handlersExamTestApi = [
  rest.get(
    `${API_URL}/api/ExamTests/GetAllExamTestsBySection/:testType/:sectionType`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockExamTests));
    }
  ),
  rest.get(
    `${API_URL}/api/ExamTests/GetAll`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockExamTests));
    }
  ),
  rest.get(
    `${API_URL}/api/AssignmentExams/GetAllByStatusWithDetail/:id/:status`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockExamTests));
    }
  ),
  rest.get(
    `${API_URL}/api/ExamTests/Details/:id`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockExamTests[0]));
    }
  ),
];

const mockExamTests = [
  {
    id: "CA9780EF-70FA-4FF7-A2E6-0CE02343FC25",
    testname: "Sample Test 1",
    title: "Sample Title 1",
    content: "Sample Content 1",
    description: "Sample Description 1",
    testType: "Multiple Choice",
    sectionType: "Reading",
    status: "Active",
    createdDate: "2023-07-14",
    createdBy: "John Doe",
    audioFile: "sample-audio1.mp3",
    audioFileUpload: new File([""], "sample-audio1.mp3"),
  },
  {
    id: "CA9780EF-71FA-4FF7-A2E6-0CE02343FC25",
    testname: "Sample Test 2",
    title: "Sample Title 2",
    content: "Sample Content 2",
    description: "Sample Description 2",
    testType: "Essay",
    sectionType: "Writing",
    status: "Inactive",
    createdDate: "2023-07-15",
    createdBy: "Jane Smith",
    audioFile: "sample-audio2.mp3",
    audioFileUpload: new File([""], "sample-audio2.mp3"),
  },
  {
    id: "CA9780EF-72FA-4FF7-A2E6-0CE02343FC25",
    testname: "Sample Test 3",
    title: "Sample Title 3",
    content: "Sample Content 3",
    description: "Sample Description 3",
    testType: "True/False",
    sectionType: "Listening",
    status: "Active",
    createdDate: "2023-07-16",
    createdBy: "Mark Johnson",
    audioFile: "sample-audio3.mp3",
    audioFileUpload: new File([""], "sample-audio3.mp3"),
  },
];

export default mockExamTests;
