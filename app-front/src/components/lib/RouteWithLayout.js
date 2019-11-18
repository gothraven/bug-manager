import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "./Loading";

function RouteWithLayout(props) {
  const { authed, layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps =>
        authed === true ? (
          <Suspense fallback={<Loading />}>
            <Layout>
              <Component {...matchProps} />
            </Layout>
          </Suspense>
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: matchProps.location } }}
          />
        )
      }
    />
  );
}

RouteWithLayout.default = {
  authed: false
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  authed: PropTypes.bool.isRequired
};

export default RouteWithLayout;
