
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BugReportIcon from '@material-ui/icons/BugReport';
import BuildIcon from '@material-ui/icons/Build';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const styles = theme => ({
  step: {
    border: "12px solid #fff",
    padding: theme.spacing(3, 2),
    backgroundColor: "#f5f5f5",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 4),
    },
    [theme.breakpoints.up('md')]: {
      borderRightWidth: 12,
      borderLeftWidth: 12,
    },
  },
  leftStep: {
    borderBottomWidth: 0,
    [theme.breakpoints.up('md')]: {
      borderBottomWidth: 12,
      borderRightWidth: 0,
    },
  },
  rightStep: {
    borderTopWidth: 0,
    [theme.breakpoints.up('md')]: {
      borderTopWidth: 12,
      borderLeftWidth: 0,
    },
  },
  stepTitle: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  stepIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    fontSize: 30,
  },
  stepBody: {
    minHeight: 290,
  },

  img: {
    maxWidth: 500,
    width: '100%',
    height: 'auto',
  },
});

function HomeSteps(props) {
  const { classes } = props;
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} md={4} className={clsx(classes.step, classes.leftStep)}>
        <div className={classes.stepTitle}>
          <BuildIcon className={classes.stepIcon} />
          <Typography variant="h5" component="h3">
            Install it
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            Follow the instructions on the README file to do all the necessary steps.
          </Typography>
          <img
            className={classes.img}
            src={`/images/themes-${theme.palette.type}.jpg`}
            loading="eager"
            alt=""
            width={500}
            height={307}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={4} className={classes.step}>
        <div className={classes.stepTitle}>
          <WhatshotIcon className={classes.stepIcon} />
          <Typography variant="h5" component="h3">
            Deploy it
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            You can deploy it on any cloud service you want with a MangoDB database.
          </Typography>
          <img
            className={classes.img}
            src={`/images/themes-${theme.palette.type}.jpg`}
            alt=""
            loading="eager"
            width={500}
            height={307}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={4} className={clsx(classes.step, classes.rightStep)}>
        <div className={classes.stepTitle}>
          <BugReportIcon className={classes.stepIcon} />
          <Typography variant="h5" component="h3">
            Start catching bugs.
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            Start using and inviting the rest of your team to colaborate on reporting and fixing bugs.
          </Typography>
          <img
            className={classes.img}
            src={`/images/themes-${theme.palette.type}.jpg`}
            loading="eager"
            alt=""
            width={500}
            height={307}
          />
        </div>
      </Grid>
    </Grid>
  );
}

HomeSteps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSteps);