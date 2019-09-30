import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideBar from "../side-bar/SideBar";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

MainLayout.defaultProps = {
  children: null // this should be replaced with loading later
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
