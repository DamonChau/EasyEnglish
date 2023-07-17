/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
//mock media stream object
Object.defineProperty(window, "MediaStream", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      start: jest.fn(),
      ondataavailable: jest.fn(),
      onerror: jest.fn(),
      state: "",
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
    })),
  });

  Object.defineProperty(MediaStream, "isTypeSupported", {
    writable: true,
    value: () => true,
  });
import "whatwg-fetch";
import React from "react";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders, store } from "../test-utils";
import QuestionManager from "../../features/questions/QuestionManager";
import QuestionAnswerReading from "../../features/questions/QuestionAnswerReading";
import QuestionAnswerSpeaking from "../../features/questions/QuestionAnswerSpeaking";
import QuestionAnswerWriting from "../../features/questions/QuestionAnswerWriting";
import { createStore } from "../../services/index";
import { mockQuestions } from "../questions/mock";
import { generateMockUser } from "../users/mock";

describe("Questions form", () => {
  test("QuestionManager Snapshot", () => {
    const item = renderWithProviders(<QuestionManager />, {
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
  test("QuestionAnswerReading Snapshot", () => {
    const onGetExamResult = () => {};
    const item = renderWithProviders(
      <QuestionAnswerReading
        testId="20312979-0936-4EAE-BE67-568C6652327E"
        onGetExamResult={onGetExamResult}
      />,
      {
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
      }
    );
    expect(item).toMatchSnapshot();
  });
  test("QuestionAnswerSpeaking Snapshot", () => {
    const item = renderWithProviders(
      <QuestionAnswerSpeaking testId="20312979-0936-4EAE-BE67-568C6652327E" />,
      {
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
      }
    );
    expect(item).toMatchSnapshot();
  });
  test("QuestionAnswerWriting Snapshot", () => {
    const item = renderWithProviders(
      <QuestionAnswerWriting testId="20312979-0936-4EAE-BE67-568C6652327E" />,
      {
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
      }
    );
    expect(item).toMatchSnapshot();
  });
});
