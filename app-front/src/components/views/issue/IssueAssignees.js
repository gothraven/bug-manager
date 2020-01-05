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
import Chip from "@material-ui/core/Chip";
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import UserAvatar from "../../lib/UserAvatar";
import { Can } from "../../core/Ability";
import { usePagination } from "../../core/hooks";
import { USERS_QUERY } from "../../core/models/users/users.graphql";

import useStyles from "./IssueAssignees.scss";

function IssueAssignees(props) {
  const classes = useStyles();
  const { onAssignAdded, onAssignRemoved } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignees, setAssignees] = useState(props.assignees);
  const [pendingAssignees, setPendingAssignees] = useState(props.assignees);
  const { data, loading: loadingAssignees, fetchMore } = usePagination(
    USERS_QUERY,
    "users",
    {
      notifyOnNetworkStatusChange: true
    }
  );

  function handleRemovedAssignees() {
    assignees
      .filter(assign => !pendingAssignees.includes(assign))
      .map(assign => onAssignRemoved(assign));
  }

  function handleAddedAssignees() {
    pendingAssignees
      .filter(assign => !assignees.includes(assign))
      .map(assign => onAssignAdded(assign));
  }

  const handleClick = event => {
    setPendingAssignees(assignees);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleRemovedAssignees();
    handleAddedAssignees();
    setAssignees(pendingAssignees);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  let hasMore = false;

  if (data && data.users && data.users.pageInfo) {
    const { hasNextPage } = data.users.pageInfo;
    hasMore = hasNextPage;
  }
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
            {assignees.map((user, index) => (
              <Grid item key={user.id || index} container alignItems="center" spacing={1}>
                <Grid item>
                  <UserAvatar user={user} className={classes.userIcon} />
                </Grid>
                <Grid item>
                  {user.name}
                </Grid>
              </Grid>
            ))}
            {assignees.length === 0 && (
              <Grid item>
                <Typography style={{ marginTop: 10 }}>No one assigned</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <AutoCompletePopper
          open={open}
          anchorEl={anchorEl}
          title="Apply labels"
          loading={loadingAssignees}
          onClose={handleClose}
          multiple
          pendingValues={pendingAssignees}
          allValues={
            loadingAssignees
              ? []
              : _.uniqBy([...assignees, ...data.users.edges], "id")
          }
          selectedValues={assignees}
          onChange={(event, newValue) => setPendingAssignees(newValue)}
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
      </Paper>
    </Box>
  );
}

IssueAssignees.propTypes = {
  assignees: PropType.array.isRequired,
  onAssignAdded: PropType.func.isRequired,
  onAssignRemoved: PropType.func.isRequired
};

export default IssueAssignees;
