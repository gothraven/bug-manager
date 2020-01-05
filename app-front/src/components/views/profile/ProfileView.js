import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import UserAvatar from "../../lib/UserAvatar";
import { useMe } from "../../core/models/users/users.hooks";

const useStyles = makeStyles(theme => ({
  userIcon: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    boxShadow: `
      0px 3px 5px -1px rgba(0,0,0,0.2),
      0px 6px 10px 0px rgba(0,0,0,0.14),
      0px 1px 18px 0px rgba(0,0,0,0.12)`
  },
  devider: {
    width: "100%",
    backgroundColor: "#B3B1AD"
  },
  bodyIcon: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));

function ProfileView() {
  const classes = useStyles();
  const { me } = useMe();

  return (
    <Grid container direction="column" alignContent="center">
      <Grid
        item
        xs={9}
        container
        direction="column"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <UserAvatar user={me} className={classes.userIcon} />
        </Grid>
        <Grid
          item
          xs={9}
          container
          direction="column"
          alignItems="center"
          spacing={1}
        >
          <Grid item container xs={12}>
            <Typography variant="h1">Your Profile</Typography>
          </Grid>
          <Grid item container xs={11} direction="column">
            <Typography variant="h4">
              Username:{" "}
              <Typography component="span" variant="h6" display="inline">
                {me.name}
              </Typography>
            </Typography>
            <Typography variant="h4">
              Email:{" "}
              <Typography component="span" variant="h6" display="inline">
                {me.email}
              </Typography>
            </Typography>
            <Typography variant="h4">
              Role:{" "}
              <Typography component="span" variant="h6" display="inline">
                {me.role}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10} container>
          <Divider variant="fullWidth" className={classes.devider} />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <BrokenImageIcon className={classes.bodyIcon} />
          <Grid item xs={6}>
            <Typography variant="body1" align="center">
              We do not have enough data to show this stage. soon here you will
              see statistics about your contributions in fixing issues.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileView;
