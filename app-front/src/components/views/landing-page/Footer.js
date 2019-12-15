import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: 100,
    backgroundColor: "rgba(38, 47, 86, 0.09)"
  },
  copyright: {
    padding: 10,
    marginTop: 70,
    backgroundColor: "rgba(171, 177, 203, 0.03)",
    textAlign: "center"
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <p className={classes.copyright}>
      Currently v0.0.0. Released under the MIT License. Copyright © 2019 Bug
      Manager.
    </p>
  );
}

export default Footer;
