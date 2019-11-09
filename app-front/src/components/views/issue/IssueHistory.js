import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropType from "prop-types";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

function IssueHistory(props) {
  const { user, type } = props;

  // const name = data.user ? data.user.name : (data.action ? data.action.name : '');

  const { icon, text } = issueAdapter[type];

  return (
    <Box m={2}>
      <Grid container>
        <Grid item xs={1} />

        <Grid item xs>
          <Box flexDirection="row">
            <Chip
              style={{
                width: 30,
                height: 30,
                padding: 11,
                paddingLeft: 15
              }}
              icon={icon}
              size="small"
            />

            <p style={{ display: "inline", marginLeft: 10 }}>
              <strong> {user.name.toUpperCase()} </strong>
              <span>{text}</span>
              <strong> {"name".toUpperCase()} </strong>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const issueAdapter = {
  assignUser: { icon: <AssignmentIndIcon />, text: "a assigné une tache à " },
  unassignUser: {
    icon: <AssignmentIndIcon />,
    text: "a desassigné une tache à "
  },
  addTag: { icon: <TurnedInIcon />, text: "a ajouté le tag " },
  removeTag: { icon: <TurnedInIcon />, text: "a supprimé le TAG " },
  changeStatus: { icon: <EditIcon />, text: "a changé le STATUS en " }
};

// const types = [
//     'assignUser',
//     'unassignUser',
//     'addTag',
//     'removeTag',
//     'changeStatus',
// ];

IssueHistory.propTypes = {
  user: PropType.object.isRequired,
  type: PropType.string.isRequired
  // data: PropType.object.isRequired,
};

export default IssueHistory;
