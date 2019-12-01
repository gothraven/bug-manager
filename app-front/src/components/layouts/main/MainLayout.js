import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "../../lib/Loading";
import SideBar from "./SideBar";
import { useMe } from "../../core/hooks";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

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
  children: PropTypes.node.isRequired
};

export default MainLayout;
