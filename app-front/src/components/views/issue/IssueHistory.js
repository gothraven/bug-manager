import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropType from "prop-types";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { ASSIGN_USER, UNASSIGN_USER, ADD_TAG, REMOVE_TAG, CHANGE_STATUS } from "../../core/constants";

function IssueHistory(props) {
  const { change } = props;
  const { data, creator, type } = change;
  const { user, tag, status, project } = data;
  const { icon, text } = issueAdapter[type];

  return (
    <Box m={2}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs>
          <Box flexDirection="row">
            <Chip
              style={{ width: 30, height: 30, padding: 11, paddingLeft: 15 }}
              icon={icon}
              size="small"
            />
            <p style={{ display: "inline", marginLeft: 10 }}>
              <strong> {creator.name} </strong>
              <span>{text}</span>
              <strong> {(user || tag || status || project).name} </strong>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const issueAdapter = {
  [ASSIGN_USER]: { icon: <AssignmentIndIcon />, text: "a assigné une tache à " },
  [UNASSIGN_USER]: {
    icon: <AssignmentIndIcon />,
    text: "a desassigné une tache à "
  },
  [ADD_TAG]: { icon: <TurnedInIcon />, text: "a ajouté le tag " },
  [REMOVE_TAG]: { icon: <TurnedInIcon />, text: "a supprimé le TAG " },
  [CHANGE_STATUS]: { icon: <EditIcon />, text: "a changé le STATUS en " }
};

IssueHistory.propTypes = {
  change: PropType.object.isRequired,
};

export default IssueHistory;
