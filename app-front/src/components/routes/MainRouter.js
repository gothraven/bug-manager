import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "../lib/RouteWithLayout";
import SignIn from "../sign-in/SignIn";
import MainLayout from "../layouts/MainLayout";

function MainRouter() {
  const isAuthenticated = true;

  return (
    <Switch>
      <Redirect exact from="/" to="/user/dashboard" />
      <Route path="/sign-in" component={SignIn} />
      <RouteWithLayout
        exact
        path="/user"
        authed={isAuthenticated}
        component={SignIn}
        layout={MainLayout}
      />
    </Switch>
  );
}

export default MainRouter;
