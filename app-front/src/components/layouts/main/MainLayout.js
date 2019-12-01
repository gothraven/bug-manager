import React from "react";
import propTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "../../lib/Loading";
import SideBar from "./SideBar";
import { useMe } from "../../core/models/users/users.hooks";

import useStyles from "./MainLayout.scss";

const MainLayout = props => {
  const { children } = props;
  const { me, loading } = useMe();
  const classes = useStyles();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar me={me} />
      <main className={classes.content}>
        {React.cloneElement(children, { me })}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default MainLayout;
