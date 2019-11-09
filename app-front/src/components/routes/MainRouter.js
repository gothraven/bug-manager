import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../lib/RouteWithLayout";
import { MainLayout } from "../layouts";
import {
  TagsView,
  SignInView,
  ProjectsView,
  NotFoundView,
  IssuePageView,
  DashboardView,
  NewIssueView
} from "../views";

function MainRouter() {
  const isAuthenticated = true;

  return (
    <Switch>
      <Redirect exact from="/" to="/user/dashboard" />
      <Route path="/sign-in" component={SignInView} />
      <RouteWithLayout
        exact
        path="/user/dashboard"
        authed={isAuthenticated}
        component={DashboardView}
        layout={MainLayout}
      />
      <RouteWithLayout
        exact
        path="/user/issue/new"
        authed={isAuthenticated}
        component={NewIssueView}
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
