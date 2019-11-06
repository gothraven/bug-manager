import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";

import IssueItem from "./IssueItem";

function DashboardView() {
  const [extended, setExtended] = useState(false);
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
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={extended}
              onChange={event => setExtended(event.target.checked)}
              value="secondary"
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <Grid item xs={6}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem divider>
            <ListItemIcon>
              <ErrorIcon style={{ color: "green" }} />
              <Typography>39 Issues Opened</Typography>
            </ListItemIcon>
            <ListItemIcon>
              <ErrorIcon style={{ color: "red" }} />
              <Typography>39 Issues Opened</Typography>
            </ListItemIcon>
          </ListItem>
          {issues.map(issue => (
            <IssueItem key={issue.id} extended={extended} issue={issue} />
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
      title: "CMC calculation error",
      creator: { id: "123123", name: "diallo" },
      status: { id: "1213DEF", name: "open" },
      assignedUsers: [
        { id: "123123123", name: "diallo" },
        { id: "123123123", name: "nadir" }
      ],
      tags: [
        { id: "123SFQ", name: "Devops", color: "#12FFEE" },
        { id: "123SFQ", name: "Bug", color: "#12FFAA" }
      ],
      project: { name: "bug Manager 1" }
    }
  ]
};

export default DashboardView;
