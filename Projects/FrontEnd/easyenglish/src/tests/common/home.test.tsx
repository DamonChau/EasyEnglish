/* eslint-disable @typescript-eslint/no-unused-vars */
import 'whatwg-fetch';
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../test-utils";
import Home from "../../features/common/Home";
import Login from "../../features/common/Login";

describe("Common components", () => {
  test("Home Page Content", () => {
    renderWithProviders(<Home />);
    const linkElement = screen.getByText(
      /The International English Language Testing System/i
    );
    expect(linkElement).toBeInTheDocument();
  });
  test("Home Page Snapshot", () => {
    const home = renderWithProviders(<Home />);
    expect(home).toMatchSnapshot();
  });

  test("Login Content", () => {
    renderWithProviders(<Login />);
    const loginElement = screen.getByText(
      /Not having an account?/i
    );
    expect(loginElement).toBeInTheDocument();
  });

  test("Login Snapshot", () => {
    const login = renderWithProviders(<Login />);
    expect(login).toMatchSnapshot();
  });
});
