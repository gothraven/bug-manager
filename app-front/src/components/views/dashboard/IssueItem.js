import React from "react";
import PropType from "prop-types";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";
import ListItemText from "@material-ui/core/ListItemText";

function IssueC(props) {
  const { extended, issue } = props;
  const history = useHistory();

  return (
    <ListItem
      button
      divider
      onClick={() => history.push("/user/projects")}
      alignItems="flex-start"
    >
      <ListItemIcon>
        <ErrorIcon style={{ color: "red" }} />
      </ListItemIcon>
      <ListItemText
        primary={issue.title}
        secondary={extended ? issue.title : null}
      />
    </ListItem>
  );
}

IssueC.propTypes = {
  issue: PropType.object.isRequired,
  extended: PropType.object.isRequired
};

export default IssueC;
