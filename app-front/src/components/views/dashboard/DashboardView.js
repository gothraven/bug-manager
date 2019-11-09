import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";

import IssueItem from "./IssueItem";

const useStyles = makeStyles(() => ({
  listHeaderBox: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    alignItems: "center"
  }
}));


function DashboardView() {
  const issues = issuesListResult.result;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        All Issues
      </Typography>
      <Grid item xs={12}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem divider>
            <Box className={classes.listHeaderBox} >
              <ErrorIcon style={{ color: "green" }} />
              <Typography>39 Issues Opened</Typography>
            </Box>          
            <Box className={classes.listHeaderBox} style={{ marginLeft: 10 }}>
              <ErrorIcon style={{ color: "red" }} />
              <Typography>39 Issues Opened</Typography>
            </Box>
          </ListItem>
          {issues.map(issue => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

const issuesListResult = {
  next: null,
  count: 1,
  result: [
    {
      id: "123FASDWE",
      createdAt: "2019-09-05T14:24:21Z",
      updatedAt: "2019-10-05T14:24:21Z",
      title: "CMC calculation error",
      creator: { id: "123123", name: "diallo" },
      status: { id: "1213DEF", name: "open" },
      open: false,
      assignedUsers: [
        { id: "123123125", name: "diallo" },
        { id: "123123124", name: "nadir" }
      ],
      tags: [
        { id: "123SFF", name: "Devops", color: "#1200FF" },
        { id: "123SFQ", name: "Bug", color: "#FF0000" }
      ],
      project: { name: "bug Manager 1" }
    },
    {
      id: "223FASDWZ",
      title: "CMC calculation error 2",
      creator: { id: "223124", name: "Safiy" },
      status: { id: "2213DEF", name: "on going" },
      open: true,
      assignedUsers: [
        { id: "223123125", name: "Ludwig" },
        { id: "223123124", name: "nadir" }
      ],
      tags: [
        { id: "223SFF", name: "Devops", color: "#002F55" },
        { id: "224SFQ", name: "Bug", color: "#FF00FF" }
      ],
      project: { name: "bug Manager 2" }
    }
  ]
};

export default DashboardView;
