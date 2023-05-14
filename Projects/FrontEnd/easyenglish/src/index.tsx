/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./services";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB:any;
  }
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="252198728206-ov8dv5g0q4gi46ed4fn12veb7f5p925n.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
