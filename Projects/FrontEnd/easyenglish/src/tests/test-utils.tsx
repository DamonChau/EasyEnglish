/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import type { ConfigureStoreOptions } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "../services/index";
import type { AppStore } from "../services/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setupListeners } from '@reduxjs/toolkit/dist/query';

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: ConfigureStoreOptions["preloadedState"];
  store?: AppStore;
}

export const store = createStore();

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <GoogleOAuthProvider clientId="252198728206-ov8dv5g0q4gi46ed4fn12veb7f5p925n.apps.googleusercontent.com">
          <MemoryRouter>{children}</MemoryRouter>
        </GoogleOAuthProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
