import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";

import IssueItem from "./IssueItem";

function DashboardView() {
  const issues = issuesListResult.result;

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
            <ListItemIcon>
              <ErrorIcon style={{ marginLeft: 5, color: "green" }} />
              <Typography>39 Issues Opened</Typography>
            </ListItemIcon>
            <ListItemIcon>
              <ErrorIcon style={{ marginLeft: 5, color: "red" }} />
              <Typography>39 Issues Opened</Typography>
            </ListItemIcon>
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
        { id: "123SFF", name: "Devops", color: "#12FFEE" },
        { id: "123SFQ", name: "Bug", color: "#12FFAA" }
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
        { id: "223SFF", name: "Devops", color: "#12FFEE" },
        { id: "224SFQ", name: "Bug", color: "#12FFAA" }
      ],
      project: { name: "bug Manager 2" }
    }
  ]
};

export default DashboardView;
