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
import { usePagination } from "../../core/hooks";
import { USERS_QUERY } from "../../core/models/users/users.graphql";
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import { Can } from "../../core/Ability";

import useStyles from "./IssueTags.scss";

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
        <Grid container justify="space-between" alignContent="center">
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
        {assignees.map((user, index) => (
          <Box key={user.id || index}>
            <Chip label={user.name} />
          </Box>
        ))}
        {assignees.length === 0 && (
          <Typography style={{ marginTop: 10 }}>None yet</Typography>
        )}
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
          noOptionsText="No labels"
          renderOption={(option, { selected }) => (
            <>
              <DoneIcon
                className={classes.iconSelected}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
              <span
                className={classes.color}
                style={{ backgroundColor: option.color }}
              />
              <div className={classes.text}>
                {option.name}
                <br />
                {option.description}
              </div>
              <CloseIcon
                className={classes.close}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
            </>
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
