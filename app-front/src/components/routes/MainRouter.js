import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../lib/RouteWithLayout";
import { MainLayout } from "../layouts";
import { APP_USER_ID } from "../core/constants";
import { history } from "../core/History";
import {
  TagsView,
  SignInView,
  SignUpView,
  ProjectsView,
  NotFoundView,
  IssuePageView,
  DashboardView,
} from "../views";

if (window !== "undefined") {
  window._history = history;
}

function MainRouter() {
  const isAuthenticated = ![null, undefined].includes(
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
          return <Redirect to="/sign-in" />;
        }}
      />
      <Route exact path="/sign-in" component={SignInView} />
      <Route exact path="/sign-up" component={SignUpView} />
      <RouteWithLayout
        exact
        path="/user/dashboard"
        authed={isAuthenticated}
        component={DashboardView}
        layout={MainLayout}
      />
      <RouteWithLayout
        path="/user/issue/:id"
        authed={isAuthenticated}
        component={IssuePageView}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/user/projects"
        authed={isAuthenticated}
        component={ProjectsView}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/user/tags"
        authed={isAuthenticated}
        component={TagsView}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/not-found"
        authed={isAuthenticated}
        component={NotFoundView}
        layout={MainLayout}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default MainRouter;
