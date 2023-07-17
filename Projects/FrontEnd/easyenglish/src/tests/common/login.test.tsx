/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "whatwg-fetch";
import React from "react";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders, store } from "../test-utils";
import Login from "../../features/common/Login";
import { usersApi } from "../../features/users/usersApi";
import { setLoggedSession } from "../../services/slices/authSlice";
import { api } from "../../services/api";

describe("Login functions", () => {
  test("renders login form", () => {
    renderWithProviders(<Login />);
    const usernameInputs = screen.getAllByPlaceholderText("User Name");
    const passwordInputs = screen.getAllByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    expect(usernameInputs[0]).toBeInTheDocument();
    expect(passwordInputs[0]).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("submits form with valid credentials", async () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: {
          token: null,
          user: null,
          isAuthenticated: false,
          refreshToken: null,
        },
      },
      store,
    });
    const usernameInputs = screen.getAllByPlaceholderText("User Name");
    const passwordInputs = screen.getAllByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInputs[0], { target: { value: "admin" } });
    fireEvent.change(passwordInputs[0], { target: { value: "123456" } });

    await act(async () => {
      fireEvent.click(submitButton);

      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await waitFor(() => {
      const state = store.getState();
      const token = state.auth.token;
      expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    });
  });

  test("login api with valid credentials", async () => {
    // Call the API directly using usersApi.login
    const response = await store.dispatch(
      usersApi.endpoints.login.initiate({
        userName: "admin",
        password: "123456",
      })
    );
    if ("data" in response) {
      await act(async () => {
        store.dispatch(setLoggedSession(response.data));
      });
    }

    await waitFor(() => {
      const state = store.getState();
      const token = state.auth.token;
      expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    });
  });

  test("displays error message with invalid credentials", async () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: {
          token: null,
          user: null,
          isAuthenticated: false,
          refreshToken: null,
        },
      },
      store,
    });
    const usernameInputs = screen.getAllByPlaceholderText("User Name");
    const passwordInputs = screen.getAllByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInputs[0], { target: { value: "admin" } });
    fireEvent.change(passwordInputs[0], { target: { value: "111111" } });

    await act(async () => {
      fireEvent.click(submitButton);

      // Wait for the next component update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const errorElement = await screen.findByText(
      "The username or password provided were incorrect!"
    );
    expect(errorElement).toBeInTheDocument();
  });
});
