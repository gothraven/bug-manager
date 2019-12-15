import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: "5vh"
  },

  header: {
    minHeight: "80vh",
    backgroundImage: 'url("/images/hero-backgroung.jpeg")'
  },

  logo: {
    width: 150,
    marginBottom: 40
  },

  title: {
    fontWeight: 400,
    fontSize: 60,
    fontVariant: "all-small-caps"
  },
  description: {
    marginTop: 10,
    maxWidth: 700
  },
  action: {
    marginTop: 20
  }
}));

function Hero() {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Container className={classes.header} maxWidth={false}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <img
          alt="Bug Manager logo"
          className={classes.logo}
          src="/images/bug-manager.svg"
        />

        <Typography
          align="center"
          display="block"
          className={classes.title}
          gutterBottom
          variant="h1"
        >
          Welcome to Bug Manager !
        </Typography>

        <Typography
          align="center"
          className={classes.description}
          gutterBottom
          variant="subtitle1"
        >
          Comet lets you track code, experiments, and results on ML projects.
          It’s fast, simple, and free for open source projects. Comet lets you
          track code, experiments, and results on ML projects. It’s fast,
          simple, and free for open source projects.
        </Typography>

        <Button
          color="secondary"
          className={classes.action}
          variant="contained"
          size="large"
          onClick={() => history.push("/user/sign-in")}
        >
          Let's get started
        </Button>
      </Grid>
    </Container>
  );
}

export default Hero;
