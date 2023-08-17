import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./components/Context";
import App from "./components/App";
import Global from "./styles/Global";
import ResetCSS from "./styles/Reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
