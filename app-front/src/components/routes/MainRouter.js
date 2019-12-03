import React, { useEffect, useState } from "react";
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
  DashboardView
} from "../views";
import { useMe } from "../core/models/users/users.hooks";
import { ability, defineRulesFor } from "../core/Ability";
import Loading from "../lib/Loading";

if (window !== "undefined") {
  window._history = history;
}

function MainRouter() {
  const isAuthenticated = ![null, undefined, ""].includes(
    localStorage.getItem(APP_USER_ID)
  );
  const { me, loading } = useMe();
  const [ready, setReady] = useState(false);


  useEffect(() => {
    if (me) {
      ability.update(defineRulesFor(me.role));
      setReady(true);
    }
  }, [me]);

  if (isAuthenticated && (loading || !ready)) {
    return <Loading />;
  }

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
        name="Dashboard"
      />
      <RouteWithLayout
        path="/user/issue/:id"
        authed={isAuthenticated}
        component={IssuePageView}
        layout={MainLayout}
        name="Issue"
      />
      <RouteWithLayout
        exact
        path="/user/projects"
        authed={isAuthenticated}
        component={ProjectsView}
        layout={MainLayout}
        name="Projects"
      />
      <RouteWithLayout
        exact
        path="/user/tags"
        authed={isAuthenticated}
        component={TagsView}
        layout={MainLayout}
        name="Tags"
      />
      <RouteWithLayout
        exact
        path="/not-found"
        authed={isAuthenticated}
        component={NotFoundView}
        layout={MainLayout}
        name="NotFound"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default MainRouter;
