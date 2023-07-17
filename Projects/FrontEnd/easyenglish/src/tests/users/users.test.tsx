/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "whatwg-fetch";
import React from "react";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders, store } from "../test-utils";
import MyTeacherDashboard from "../../features/users/MyTeacherDashboard";
import MyStudentDashboard from "../../features/users/MyStudentDashboard";
import NewUserAccount from "../../features/users/NewUserAccount";
import UserManager from "../../features/users/UserManager";
import { createStore } from "../../services/index";
import { generateMockUser } from "../users/mock";
import { mockLessonsData } from "../lessons/mock";

describe("Users form", () => {
  test("MyTeacherDashboard Snapshot", () => {
    const item = renderWithProviders(<MyTeacherDashboard />, {
      store: createStore({
        preloadedState: {
          auth: {
            token: null,
            user: generateMockUser(),
            isAuthenticated: false,
            refreshToken: null,
          },
        },
      }),
    });
    expect(item).toMatchSnapshot();
  });
  test("MyStudentDashboard Snapshot", () => {
    const item = renderWithProviders(<MyStudentDashboard />, {
      store: createStore({
        preloadedState: {
          auth: {
            token: null,
            user: generateMockUser(),
            isAuthenticated: false,
            refreshToken: null,
          },
        },
      }),
    });
    expect(item).toMatchSnapshot();
  });
  test("NewUserAccount Snapshot", () => {
    const item = renderWithProviders(<NewUserAccount />, {
      store: createStore({
        preloadedState: {
          auth: {
            token: null,
            user: generateMockUser(),
            isAuthenticated: false,
            refreshToken: null,
          },
        },
      }),
    });
    expect(item).toMatchSnapshot();
  });
  test("UserManager Snapshot", () => {
    const item = renderWithProviders(<UserManager />, {
      store: createStore({
        preloadedState: {
          auth: {
            token: null,
            user: generateMockUser(),
            isAuthenticated: false,
            refreshToken: null,
          },
        },
      }),
    });
    expect(item).toMatchSnapshot();
  });
});
