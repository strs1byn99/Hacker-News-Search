import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import PostDetail from "./PostDetail";

const routing = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/items/:id" component={PostDetail} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
