import React, { useState } from "react";
import _ from "lodash";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import UserAvatar from "../../lib/UserAvatar";
import { Can } from "../../core/Ability";
import { usePagination } from "../../core/hooks";
import { USERS_QUERY } from "../../core/models/users/users.graphql";

import useStyles from "./IssueAssignees.scss";

function AutoCompleteComponent(props) {
  const classes = useStyles();
  const {
    assignedUsers,
    handleClose,
    anchorEl,
    pendingAssignedUsers,
    setPendingAssignedUsers
  } = props;
  const { data, loading: loadingAssignedUser, fetchMore } = usePagination(
    USERS_QUERY,
    "users",
    {
      notifyOnNetworkStatusChange: true
    }
  );

  const open = Boolean(anchorEl);
  let hasMore = false;

  if (data && data.users && data.users.pageInfo) {
    const { hasNextPage } = data.users.pageInfo;
    hasMore = hasNextPage;
  }

  return (
    <AutoCompletePopper
      open={open}
      anchorEl={anchorEl}
      title="Apply labels"
      loading={loadingAssignedUser}
      onClose={handleClose}
      multiple
      pendingValues={pendingAssignedUsers}
      allValues={
        loadingAssignedUser
          ? []
          : _.uniqBy([...assignedUsers, ...data.users.edges], "id")
      }
      selectedValues={assignedUsers}
      onChange={(event, newValue) => setPendingAssignedUsers(newValue)}
      hasMore={hasMore}
      fetchMore={fetchMore}
      noOptionsText="No options"
      renderOption={(option, { selected }) => (
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={1}>
            <DoneIcon
              className={classes.iconSelected}
              style={{ visibility: selected ? "visible" : "hidden" }}
            />
          </Grid>
          <Grid item xs={2}>
            <UserAvatar user={option} className={classes.userIcon} />
          </Grid>
          <Grid item xs={8}>
            {option.name}
          </Grid>
          <Grid item xs={1}>
            <CloseIcon
              className={classes.close}
              style={{ visibility: selected ? "visible" : "hidden" }}
            />
          </Grid>
        </Grid>
      )}
    />
  );
}

AutoCompleteComponent.defaultProps = {
  anchorEl: null
};

AutoCompleteComponent.propTypes = {
  assignedUsers: PropType.array.isRequired,
  anchorEl: PropType.object,
  pendingAssignedUsers: PropType.array.isRequired,
  handleClose: PropType.func.isRequired,
  setPendingAssignedUsers: PropType.func.isRequired
};

function IssueAssignees(props) {
  const classes = useStyles();
  const { onAssignUser, onUnassignUser } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState(props.assignedUsers);
  const [pendingAssignedUsers, setPendingAssignedUsers] = useState(
    props.assignedUsers
  );

  function handleRemovedAssignees() {
    assignedUsers
      .filter(assign => !pendingAssignedUsers.includes(assign))
      .map(assign => onUnassignUser(assign));
  }

  function handleAddedAssignees() {
    pendingAssignedUsers
      .filter(assign => !assignedUsers.includes(assign))
      .map(assign => onAssignUser(assign));
  }

  const handleClick = event => {
    setPendingAssignedUsers(assignedUsers);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleRemovedAssignees();
    handleAddedAssignees();
    setAssignedUsers(pendingAssignedUsers);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="space-between" alignContent="center">
            <Typography
              variant="h3"
              style={{ textTransform: "uppercase", color: "#2E231C" }}
            >
              Assign
            </Typography>
            <Can I="use" this="AssignTags">
              {() => (
                <IconButton
                  component="span"
                  style={{ padding: 0 }}
                  onClick={handleClick}
                >
                  <SettingsIcon />
                </IconButton>
              )}
            </Can>
          </Grid>
          <Divider />
          <Grid item container spacing={1}>
            {assignedUsers.map((user, index) => (
              <Grid
                item
                key={user.id || index}
                container
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <UserAvatar user={user} className={classes.userIcon} />
                </Grid>
                <Grid item>{user.name}</Grid>
              </Grid>
            ))}
            {assignedUsers.length === 0 && (
              <Grid item>
                <Typography style={{ marginTop: 10 }}>
                  No one assigned
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Can I="use" this="AssignTags">
          {() => (
            <AutoCompleteComponent
              pendingAssignedUsers={pendingAssignedUsers}
              setPendingAssignedUsers={setPendingAssignedUsers}
              assignedUsers={assignedUsers}
              handleClose={handleClose}
              anchorEl={anchorEl}
            />
          )}
        </Can>
      </Paper>
    </Box>
  );
}

IssueAssignees.propTypes = {
  assignedUsers: PropType.array.isRequired,
  onAssignUser: PropType.func.isRequired,
  onUnassignUser: PropType.func.isRequired
};

export default IssueAssignees;
