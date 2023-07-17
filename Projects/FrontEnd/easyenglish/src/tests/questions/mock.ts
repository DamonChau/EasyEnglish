/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from "msw";

const API_URL = "http://localhost:5097";
import { faker } from "@faker-js/faker";
import {
  QuestionType,
  Status,
  Questions,
  QuestionDetails,
} from "../../models/types";

export const handlersQuestionApi = [
  rest.get(
    `${API_URL}/api/Questions/GetAllExamTest/:examTestId`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockQuestions));
    }
  ),
  rest.get(
    `${API_URL}/api/Questions/GetAllExamTestWithQD/:examTestId`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockQuestions));
    }
  ),
];

function generateMockQuestion(): Questions {
  const id = faker.string.uuid();
  const question: Questions = {
    id: id,
    order: faker.number.int({ min: 1, max: 10 }),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    description: faker.lorem.paragraph(),
    questionType: faker.helpers.arrayElement(
      Object.values(QuestionType)
    ) as QuestionType,
    status: faker.helpers.arrayElement(Object.values(Status)) as Status,
    createdDate: faker.date.past().toISOString(),
    createdBy: faker.internet.userName(),
    examTestId: faker.string.uuid(),
    questionDetails: generateMockQuestionDetails(id),
  };

  return question;
}

function generateMockQuestionDetails(id: string): QuestionDetails[] {
  const questionDetails: QuestionDetails[] = [];
  for (let i = 0; i < 2; i++) {
    const detail: QuestionDetails = {
      id: faker.string.uuid(),
      order: faker.number.int({ min: 1, max: 10 }),
      qno: faker.number.int({ min: 1, max: 10 }),
      content: faker.lorem.sentence(),
      answer: faker.lorem.sentence(),
      createdDate: faker.date.past().toISOString(),
      createdBy: faker.internet.userName(),
      questionId: id,
      questionType: faker.helpers.arrayElement(
        Object.values(QuestionType)
      ) as QuestionType,
    };
    questionDetails.push(detail);
  }
  return questionDetails;
}

// Generate a list of three mock questions
export const mockQuestions: Questions[] = [];
for (let i = 0; i < 3; i++) {
  const question = generateMockQuestion();
  mockQuestions.push(question);
}
