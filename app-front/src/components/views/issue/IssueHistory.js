import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropType from "prop-types";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import ErrorIcon from "@material-ui/icons/Error";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import ClassIcon from "@material-ui/icons/Class";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import {
  ASSIGN_USER,
  UNASSIGN_USER,
  ADD_TAG,
  REMOVE_TAG,
  CHANGE_STATUS,
  REOPEN_ISSUE,
  CLOSE_ISSUE,
  ATTACH_TO_PROJECT,
  DETATCH_FROM_PROJECT
} from "../../core/constants";

function IssueHistory(props) {
  const { change } = props;
  const { data, creator, type } = change;
  const { user, tag, status, project } = data;
  const { icon, text } = issueAdapter[type];

  return (
    <Grid item container>
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
            <strong>
              {(user || tag || status || project || { name: "" }).name}
            </strong>
          </p>
        </Box>
      </Grid>
    </Grid>
  );
}

const issueAdapter = {
  [ASSIGN_USER]: {
    icon: <AssignmentIndIcon />,
    text: "a assigné une tache à "
  },
  [UNASSIGN_USER]: {
    icon: <AssignmentIndIcon />,
    text: "a desassigné une tache à "
  },
  [ADD_TAG]: { icon: <TurnedInIcon />, text: "a ajouté le tag " },
  [REMOVE_TAG]: { icon: <TurnedInIcon />, text: "a supprimé le TAG " },
  [CLOSE_ISSUE]: {
    icon: <ErrorIcon style={{ color: "red" }} />,
    text: "a fermé l'issue"
  },
  [REOPEN_ISSUE]: {
    icon: <ErrorIcon style={{ color: "green" }} />,
    text: "a reouvert l'issue"
  },
  [ATTACH_TO_PROJECT]: {
    icon: <ClassIcon />,
    text: "a attaché l'issue au project "
  },
  [DETATCH_FROM_PROJECT]: {
    icon: <ClassIcon />,
    text: "a dettaché l'issue du project "
  },
  [CHANGE_STATUS]: { icon: <EditIcon />, text: "a changé le STATUS en " }
};

IssueHistory.propTypes = {
  change: PropType.object.isRequired
};

export default IssueHistory;
