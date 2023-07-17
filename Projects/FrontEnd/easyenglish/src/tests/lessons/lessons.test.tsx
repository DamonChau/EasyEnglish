/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "whatwg-fetch";
import React from "react";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders, store } from "../test-utils";
import LessonManager from "../../features/lessons/LessonManager";
import LessonDetail from "../../features/lessons/LessonDetail";
import LessonList from "../../features/lessons/LessonList";
import LessonView from "../../features/lessons/LessonView";
import LessonHome from "../../features/lessons/LessonHome";
import { createStore } from "../../services/index";
import { generateMockUser } from "../users/mock";
import { mockLessonsData } from "../lessons/mock";

describe("Lessons form", () => {
  test("LessonManager Snapshot", () => {
    const item = renderWithProviders(<LessonManager />);
    expect(item).toMatchSnapshot();
  });
  test("LessonDetail Snapshot", () => {
    const item = renderWithProviders(<LessonDetail />, {
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
  test("LessonList Snapshot", () => {
    const item = renderWithProviders(<LessonList />);
    expect(item).toMatchSnapshot();
  });
  test("LessonView Snapshot", () => {
    const item = renderWithProviders(<LessonView />);
    expect(item).toMatchSnapshot();
  });
  test("LessonHome Snapshot", () => {
    const item = renderWithProviders(<LessonHome />);
    expect(item).toMatchSnapshot();
  });
  test("renders LessonManager form", async () => {
    renderWithProviders(<LessonManager />);
    await act(async () => {
      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const testnameElement = await screen.findByText(mockLessonsData[0].lessonName);
    expect(testnameElement).toBeInTheDocument();
  });
  test("renders LessonList form", async () => {
    renderWithProviders(<LessonList />);
    await act(async () => {
      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const array = await screen.findAllByText("Lesson List");
    expect(array[0]).toBeInTheDocument();

    const testnameElement = await screen.findByText(mockLessonsData[0].lessonName);
    expect(testnameElement).toBeInTheDocument();
  });
});
