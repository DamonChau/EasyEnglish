/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from "msw";

const API_URL = "http://localhost:5097";
import { faker } from "@faker-js/faker";
import { LessonType, Status, Lessons } from "../../models/types";

export const handlersLessonApi = [
  rest.get(
    `${API_URL}/api/Lesson/GetAllLessons`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockLessonsData));
    }
  ),
  rest.get(
    `${API_URL}/api/Lesson/GetAllLessonByType/:lessonType`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockLessonsData));
    }
  ),
  rest.get(
    `${API_URL}/api/Lesson/Details/:id`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockLessonsData[0]));
    }
  ),
];

function generateMockLesson(): Lessons {
  const lesson: Lessons = {
    id: faker.string.uuid(),
    lessonName: faker.lorem.words(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs(),
    lessonType: faker.helpers.arrayElement(
      Object.values(LessonType)
    ) as LessonType,
    hashTag: faker.lorem.word(),
    status: faker.helpers.arrayElement(Object.values(Status)) as Status,
    createdDate: faker.date.past().toISOString(),
    createdBy: faker.internet.userName(),
  };

  return lesson;
}

export const mockLessonsData: Lessons[] = [];
for (let i = 0; i < 3; i++) {
  const lesson = generateMockLesson();
  mockLessonsData.push(lesson);
}
