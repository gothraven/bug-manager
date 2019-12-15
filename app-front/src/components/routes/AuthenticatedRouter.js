import React, { useEffect, useState } from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import RouteWithLayout from "../lib/RouteWithLayout";
import { MainLayout } from "../layouts";
import { APP_USER_ID } from "../core/constants";
import {
  TagsView,
  ProjectsView,
  IssuePageView,
  DashboardView,
  NotFoundView
} from "../views";
import { useMe } from "../core/models/users/users.hooks";
import { ability, defineRulesFor } from "../core/Ability";
import Loading from "../lib/Loading";

function AuthenticatedRouter() {
  const location = useLocation();
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

  if (!isAuthenticated) {
    if (location.pathname.startsWith("/user")) {
      return (
        <Redirect
          push
          to={{
            pathname: "/user/sign-in",
            state: { from: location }
          }}
        />
      );
    }
    return <Redirect to="/not-found" />;
  }

  if (isAuthenticated && (loading || !ready)) {
    return <Loading />;
  }

  return (
    <Switch>
      <RouteWithLayout
        exact
        path="/user/dashboard"
        component={DashboardView}
        layout={MainLayout}
        name="Dashboard"
      />
      <RouteWithLayout
        path="/user/issue/:id"
        component={IssuePageView}
        layout={MainLayout}
        name="Issue"
      />
      <RouteWithLayout
        exact
        path="/user/projects"
        component={ProjectsView}
        layout={MainLayout}
        name="Projects"
      />
      <RouteWithLayout
        exact
        path="/user/tags"
        component={TagsView}
        layout={MainLayout}
        name="Tags"
      />
      <RouteWithLayout
        exact
        path="/user/not-found"
        component={NotFoundView}
        layout={MainLayout}
        name="Tags"
      />
      {isAuthenticated && <Redirect to="/user/not-found" />}
    </Switch>
  );
}

export default AuthenticatedRouter;
