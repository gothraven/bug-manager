import React from "react";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UserAvatar from "../../lib/UserAvatar";

function IssueAssignees(props) {
  const { assignees } = props;

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Typography
          variant="h3"
          style={{ textTransform: "uppercase", color: "#2E231C" }}
        >
          Assignees
        </Typography>
        <Divider />
        {assignees.map(assignee => (
          <Grid container direction="row" key={assignee.id} alignItems="center">
            <UserAvatar user={assignee} />
            <Typography>{assignee.name}</Typography>
          </Grid>
        ))}
      </Paper>
    </Box>
  );
}

IssueAssignees.propTypes = { assignees: PropType.array.isRequired };

export default IssueAssignees;
