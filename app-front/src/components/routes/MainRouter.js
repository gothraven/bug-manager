import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { APP_USER_ID } from "../core/constants";
import { history } from "../core/History";
import AuthetnticatedRouter from "./AuthenticatedRouter";
import {
  SignInView,
  SignUpView,
  NotFoundView,
} from "../views";

if (window !== "undefined") {
  window._history = history;
}

function MainRouter() {
  const isAuthenticated = ![null, undefined, ""].includes(
    localStorage.getItem(APP_USER_ID)
  );

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (isAuthenticated) {
            return <Redirect to="/user/dashboard" />;
          }
          return <Redirect to="/user/sign-in" />;
        }}
      />
      <Route exact path="/user/sign-in" component={SignInView} />
      <Route exact path="/user/sign-up" component={SignUpView} />
      <Route exact path="/user/forget-password" component={NotFoundView} />
      <Route exact path="/not-found" component={NotFoundView} />
      <AuthetnticatedRouter />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default MainRouter;
