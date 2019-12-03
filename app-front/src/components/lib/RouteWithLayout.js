import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { AbilityContext } from "../core/Ability";
import { NotFoundView } from "../views";

function RouteWithLayout(props) {
  const { authed, layout: Layout, component: Component, name, ...rest } = props;
  const ability = useContext(AbilityContext);

  return (
    <Route
      {...rest}
      render={matchProps =>
        authed === true ? (
          <Layout>
            {
              ability.can("see", name)
                ? <Component {...matchProps} />
                : <NotFoundView />
            }
          </Layout>
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
  authed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default RouteWithLayout;
