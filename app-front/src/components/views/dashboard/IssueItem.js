import React from "react";
import PropType from "prop-types";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import moment from "moment";

import useStyles from "./IssueItem.scss";
import TagChip from "../../lib/TagChip";

function IssueItem(props) {
  const { issue } = props;
  const {
    id,
    title,
    createdAt,
    updatedAt,
    creator,
    open,
    assignedUsers,
    tags,
    project
  } = issue;
  const history = useHistory();
  const classes = useStyles();

  return (
    <ListItem button divider onClick={() => history.push(`/user/issue/${id}`)}>
      <ListItemIcon>
        <ErrorIcon style={{ color: open ? "green" : "red" }} />
      </ListItemIcon>
      <ListItemText
        classes={{ primary: classes.title, secondary: classes.inline }}
        primary={title}
        secondary={`
          Created ${moment(createdAt).fromNow()} by ${creator.name}
           - last Updated ${moment(updatedAt).fromNow()}
          ${
            assignedUsers.length
              ? `- Assigned to ${assignedUsers.map(user => ` ${user.name}`)}`
              : ""
          }
          ${
            (project || {}).name ? `- this issue opened on ${project.name}` : ""
          }`}
      />
      <Box>
        {tags.map(tag => (
          <TagChip
            key={tag.id}
            tag={tag}
            style={{ height: 25, margin: 2, fontWeight: 400 }}
          />
        ))}
      </Box>
    </ListItem>
  );
}

IssueItem.propTypes = {
  issue: PropType.object.isRequired
};

export default IssueItem;
