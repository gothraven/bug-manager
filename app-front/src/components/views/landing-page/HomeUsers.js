import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const users = [
  {
    logo: 'nasa.svg',
    logoWidth: 49,
    logoHeight: 40,
    caption: 'NASA',
  },
  {
    logo: 'walmart-labs.svg',
    logoWidth: 253,
    logoHeight: 48,
    caption: 'Walmart Labs',
    class: 'walmart',
  },
  {
    logo: 'capgemini.svg',
    logoWidth: 180,
    logoHeight: 40,
    caption: 'Capgemini',
  },
  {
    logo: 'uniqlo.svg',
    logoWidth: 40,
    logoHeight: 40,
    caption: 'Uniqlo',
  },
  {
    logo: 'bethesda.svg',
    logoWidth: 196,
    logoHeight: 29,
    caption: 'Bethesda',
  },
  {
    logo: 'jpmorgan.svg',
    logoWidth: 198,
    logoHeight: 40,
    caption: 'J.P. Morgan',
  },
  {
    logo: 'shutterstock.svg',
    caption: 'Shutterstock',
    logoWidth: 205,
    logoHeight: 29,
  },
];

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 160,
    paddingTop: theme.spacing(5),
  },
  container: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
  },
  grid: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  img: {
    margin: theme.spacing(1.5, 3),
  },
  walmart: {
    margin: theme.spacing(1.1, 3, 1.5),
  },
});

function HomeUsers(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Divider />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Who's using BUG-MANAGER?
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Join these and other great organisations!
        </Typography>
        <Grid container justify="center" className={classes.grid}>
          {users.map(user => (
            <img
              key={user.caption}
              src={`/images/users/${user.logo}`}
              className={clsx(classes.img, classes[user.class])}
              loading="lazy"
              alt=""
              width={user.logoWidth}
              height={user.logoHeight}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

HomeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeUsers);