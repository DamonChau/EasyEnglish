/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from "msw";

const API_URL = "http://localhost:5097";

export const handlersUserApi = [
  rest.post(`${API_URL}/api/Users/login`, async (req: any, res, ctx) => {
    const { userName, password } = await req.json();
    if (userName === "admin" && password === "123456") {
      return res(
        ctx.status(200),
        ctx.json({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          refreshToken: "",
          user: {},
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({ error: "The username or password provided were incorrect!" })
      );
    }
  }),
];
