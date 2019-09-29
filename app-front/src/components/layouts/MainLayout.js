import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%"
  }
}));

const MainLayout = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: false
      })}
    >
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
