/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "whatwg-fetch";
import { setupServer } from "msw/node";
import { handlersUserApi } from "../tests/common/mock";
import { handlersExamTestApi } from "../tests/examTests/mock";
import { handlersLessonApi } from "../tests/lessons/mock";
import { store } from "./test-utils";
import { api } from "../services/api";

jest.mock("../helpers/contants", () => ({
  config: {
    url: {
      API_URL_FOLDER: "",
      API_URL: "http://localhost:5097",
    },
  },
}));

const server = setupServer(
  ...handlersUserApi,
  ...handlersExamTestApi,
  ...handlersLessonApi
);
//server.printHandlers();
beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  })
);
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(api.util.resetApiState());
});
afterAll(() => server.close());
