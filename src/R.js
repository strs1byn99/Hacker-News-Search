import React from "react";
import { Switch, Route } from "react-router-dom";
import PostDetail from "./PostDetail";
import "bootstrap/dist/css/bootstrap.min.css";

export default class R extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/items" component={PostDetail} />
      </Switch>
    );
  }
}
