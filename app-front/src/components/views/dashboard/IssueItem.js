import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorIcon from "@material-ui/icons/Error";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import { invertColor } from "../../core/utils/Functions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline",
    marginLeft: 5,
    fontSize: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
      alignItems="flex-start"
    >
      <ListItemIcon>
        <ErrorIcon style={{ color: issue.open ? "green" : "red" }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            component="span"
            variant="body"
            className={classes.title}
            color="textPrimary"
          >
            {issue.title}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body"
              className={classes.inline}
              color="textPrimary"
            >
              Created {moment(issue.createdAt).fromNow()} by{" "}
              {issue.creator.name}
            </Typography>
            {" - "}
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              last Updated {moment(issue.updatedAt).fromNow()}
            </Typography>
            <Typography className={classes.inline}>
              {" - Assigned to "}{" "}
              {issue.assignedUsers.map(user => (
                <>
                  {user.name}
                  {", "}
                </>
              ))}
            </Typography>
            <Typography
              component="span"
              variant="body"
              className={classes.inline}
              color="textPrimary"
            >
              {" - this issue opened on "} {issue.project.name}
            </Typography>
            {issue.tags.map(tag => (
              <Chip
                key={tag.id}
                size="small"
                label={tag.name}
                style={{
                  borderColor: tag.color,
                  marginLeft: 5,
                  backgroundColor: tag.color,
                  color: invertColor(tag.color)
                }}
              />
            ))}
          </>
        }
      />
    </ListItem>
  );
}

IssueItem.propTypes = {
  issue: PropType.object.isRequired
};

export default IssueItem;
