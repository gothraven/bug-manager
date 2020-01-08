import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Copyright from "../../lib/Copyright";
import HomeUsers from "./HomeUsers";
import HomeSteps from "./HomeSteps";

const useStyles = makeStyles(theme => ({
  root: {
    flex: "1 0 100%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
      flexDirection: "row",
      alignItems: "flex-start",
      textAlign: "left"
    }
  },
  title: {
    marginLeft: -12,
    whiteSpace: "nowrap",
    letterSpacing: ".7rem",
    textIndent: ".7rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: 28
    }
  },
  logo: {
    flexShrink: 0,
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(8),
      width: 220,
      height: 200
    }
  },
  button: {
    marginTop: theme.spacing(4)
  }
}));

function LandingPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main id="main-content" tabIndex="-1">
        <Container maxWidth="md" className={classes.content}>
          <img
            alt="Bug Manager logo"
            className={classes.logo}
            src="/images/bug-manager.svg"
          />
          <div>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              className={classes.title}
            >
              BUG-MANAGER
            </Typography>
            <Typography variant="h4" component="h2">
              An Issue Manager for faster and easier development. Build your own
              project system, for monitoring issues.
            </Typography>
            <Button
              className={classes.button}
              onClick={() => history.push("/")}
              variant="outlined"
            >
              Get Started
            </Button>
          </div>
        </Container>
        <HomeSteps />
        <HomeUsers />
      </main>
      <Grid container justify="center">
        <Grid item>
          <Copyright />
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
