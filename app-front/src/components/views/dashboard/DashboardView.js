import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { ListItemIcon, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "10px"
  },
  inline: {
    display: "inline"
  },
  chipContainer: {
    marginRight: 15
  }
}));
function DashboardView() {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          <ListItemIcon className={classes.chipContainer}>
            <Chip label="Basic" />
          </ListItemIcon>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {
                  " — Wish I could come, but I'm out of town this lkxn,dkad,nz kdlzxaznlaznxzklaxa jkanxjax…"
                }
              </>
            }
          />
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

DashboardView.propTypes = {};

export default DashboardView;
