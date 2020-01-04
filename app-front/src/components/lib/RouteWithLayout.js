import React, { useContext } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { AbilityContext } from "../core/Ability";
import { NotFoundView } from "../views";

function RouteWithLayout(props) {
  const { layout: Layout, component: Component, name, ...rest } = props;
  const ability = useContext(AbilityContext);

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          {ability.can("see", name) ? (
            <Component {...matchProps} />
          ) : (
            <NotFoundView />
          )}
        </Layout>
      )}
    />
  );
}

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired
};

export default RouteWithLayout;
