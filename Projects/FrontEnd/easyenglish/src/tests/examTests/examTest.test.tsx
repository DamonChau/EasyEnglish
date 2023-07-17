/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "whatwg-fetch";
import React from "react";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders, store } from "../test-utils";
import ExamTestsList from "../../features/examTests/ExamTestsList";
import ExamTestsManager from "../../features/examTests/ExamTestsManager";
import ExamTestsDetail from "../../features/examTests/ExamTestsDetail";
import ExamTestsByStatus from "../../features/examTests/ExamTestsByStatus";
import ExamTestsView from "../../features/examTests/ExamTestsView";
import ExamTestsViewerControl from "../../features/examTests/ExamTestsViewerControl";
import ViewExamTestsModal from "../../features/examTests/ViewExamTestsModal";
import { AssignmentStatus } from "../../models/types";
import { generateMockUser } from "../users/mock";
import { createStore } from "../../services/index";

describe("ExamTests form", () => {
  test("ExamTestsList Snapshot", () => {
    const item = renderWithProviders(<ExamTestsList />);
    expect(item).toMatchSnapshot();
  });
  test("ExamTestsManager Snapshot", () => {
    const item = renderWithProviders(<ExamTestsManager />);
    expect(item).toMatchSnapshot();
  });
  test("ExamTestsDetail Snapshot", () => {
    const item = renderWithProviders(<ExamTestsDetail />, {
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
  test("ExamTestsByStatus Snapshot", () => {
    const item = renderWithProviders(
      <ExamTestsByStatus
        status={AssignmentStatus.Done}
        userId="20312979-0936-4EAE-BE67-568C6652327E"
      />
    );
    expect(item).toMatchSnapshot();
  });
  test("ExamTestsView Snapshot", () => {
    const item = renderWithProviders(<ExamTestsView />);
    expect(item).toMatchSnapshot();
  });
  test("ExamTestsViewerControl Snapshot", () => {
    const onSelectedDone = ()=>{};
    const item = renderWithProviders(<ExamTestsViewerControl onSelectedDone={onSelectedDone}/>);
    expect(item).toMatchSnapshot();
  });
  test("ViewExamTestsModal Snapshot", () => {
    const onClose = ()=>{}
    const onSubmit = ()=>{}
    const item = renderWithProviders(<ViewExamTestsModal open={false} onClose={onClose} onSubmit={onSubmit}/>);
    expect(item).toMatchSnapshot();
  });
  test("renders ExamTestsList form", async () => {
    renderWithProviders(<ExamTestsList />);
    await act(async () => {
      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const testnameElement = await screen.findByText("Sample Test 1");
    expect(testnameElement).toBeInTheDocument();
  });
  test("renders ExamTestsManager form", async () => {
    renderWithProviders(<ExamTestsManager />);
    await act(async () => {
      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const array = await screen.findAllByText("Exam Test Manager");
    expect(array[0]).toBeInTheDocument();

    const testnameElement = await screen.findByText("Sample Test 1");
    expect(testnameElement).toBeInTheDocument();
  });
});
