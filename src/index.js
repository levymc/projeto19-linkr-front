import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./components/Context";
import reportWebVitals from "./reportWebVitals";
import Global from "./styles/Global";
import ResetCSS from "./styles/Reset";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ResetCSS />
        <Global />
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
