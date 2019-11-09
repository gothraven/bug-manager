import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import { invertColor } from "../../core/utils/Functions";

const useStyles = makeStyles(theme => ({
  inline: {
    fontSize: theme.typography.body1
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

function IssueItem(props) {
  const { issue } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <ListItem
      button
      divider
      onClick={() => history.push("/user/projects")}
    >
      <ListItemIcon>
        <ErrorIcon style={{ color: issue.open ? "green" : "red" }} />
      </ListItemIcon>
      <ListItemText
        classes={{ primary: classes.title, secondary: classes.inline }}
        primary={issue.title}
        secondary={
          `Created ${moment(issue.createdAt).fromNow()} by ${issue.creator.name}
           -
          last Updated ${moment(issue.updatedAt).fromNow()}
           -
          Assigned to ${issue.assignedUsers.map(user => ` ${user.name}`)}
           -
          this issue opened on ${issue.project.name}`
        }
      />
      <Box>
        {issue.tags.map(tag => (
          <Chip
            key={tag.id}
            label={tag.name}
            size="small"
            style={{
              margin: 2,
              backgroundColor: tag.color,
              color: invertColor(tag.color)
            }}
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
