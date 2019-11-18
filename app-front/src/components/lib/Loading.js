import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loading: {
    position: "fixed",
    left: "50%",
    top: "50%",
    width: "100%",
    height: "100%",
    zIndex: 9999
  }
}));

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
