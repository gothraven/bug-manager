import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      style={{ textAlign: "center", marginTop: 50 }}
    >
      <Grid item lg={6} xs={12}>
        <div className={classes.content}>
          <Typography variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <img
            alt="Under development"
            className={classes.image}
            src="/images/page_not_found.svg"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default NotFoundView;
