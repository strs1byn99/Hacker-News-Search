import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import R from "./R";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <R />
  </BrowserRouter>,
  document.getElementById("root")
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
