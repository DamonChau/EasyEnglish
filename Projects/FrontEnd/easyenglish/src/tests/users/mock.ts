/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from "msw";

const API_URL = "http://localhost:5097";
import { faker } from "@faker-js/faker";
import { LoginType, Status, UserType, Users } from "../../models/types";

export const handlersUsersApi = [
  rest.get(
    `${API_URL}/api/Users/GetAll`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUsers));
    }
  ),
  rest.get(
    `${API_URL}/api/Users/GetAllTeachers/:userId`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUsers));
    }
  ),
  rest.get(
    `${API_URL}/api/Users/Details/:userId`,
    async (req: any, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUsers[0]));
    }
  ),
];

export function generateMockUser(): Users {
    const user: Users = {
      id: faker.string.uuid(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      phoneNo: faker.phone.number(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      billingAddress: faker.location.streetAddress(),
      userType: faker.helpers.arrayElement(Object.values(UserType)) as UserType,
      description: faker.lorem.sentence(),
      token: 0,
      status: faker.helpers.arrayElement(Object.values(Status)) as Status,
      createdDate: faker.date.past().toISOString(),
      loginDate: faker.date.recent().toISOString(),
      aliasName: faker.internet.userName(),
      loginType:  faker.helpers.arrayElement(Object.values(LoginType)) as LoginType,
    };
  
    return user;
  }

// Generate a list of three mock questions
export const mockUsers: Users[] = [];
for (let i = 0; i < 3; i++) {
  const user = generateMockUser();
  mockUsers.push(user);
}
