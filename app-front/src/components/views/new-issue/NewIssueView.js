import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

function NewIssueView() {
  const classes = useStyles();

  return (
    <Grid
      container
      xs={12}
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        New issue
      </Typography>
      <Grid item>
        <Grid container xs={12} justify="space-between">
          <Avatar alt="">RS</Avatar>
          <Grid item xs={7}>
            <Paper>
              <Grid container direction="column" alignItems="stretch">
                <TextField
                  name="title"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  placeholder="The issue title"
                  className={classes.textField}
                  required
                />
                <TextField
                  name="content"
                  label="Content"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  placeholder="Describe your issue here"
                  rowsMax="15"
                  required
                  multiline
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Grid container direction="column" alignItems="stretch">
                <TextField
                  name="title"
                  label="Title"
                  margin="normal"
                  placeholder="The issue title"
                  className={classes.textField}
                  required
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NewIssueView;
