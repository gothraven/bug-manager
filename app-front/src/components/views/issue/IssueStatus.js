import React, { useState } from "react";
import propType from "prop-types";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { useQuery } from "@apollo/react-hooks";
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import { STATUSES_QUERY } from "../../core/models/statuses/statuses.graphql";
import { Can } from "../../core/Ability";

function IssueStatus(props) {
  const { onUpdateIssueStatus, open: isOpen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(props.status);
  const { data, loading: loadingStatus } = useQuery(STATUSES_QUERY, {
    notifyOnNetworkStatusChange: true
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item container justify="space-between" alignContent="center">
            <Typography
              variant="h3"
              style={{ textTransform: "uppercase", color: "#2E231C" }}
            >
              Status
            </Typography>
            {isOpen && (
              <Can I="use" this="ChangeStatus">
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
            )}
          </Grid>
          <Divider />
          <Grid item>
            <Typography variant="h6">
              {isOpen ? (status || { name: "Opened" }).name : "Closed"}
            </Typography>
          </Grid>
        </Grid>
        <Can I="use" this="ChangeStatus">
          {() => (
            <AutoCompletePopper
              open={open}
              anchorEl={anchorEl}
              title="Change status"
              loading={loadingStatus}
              onClose={handleClose}
              pendingValues={status ? [] : [status]}
              allValues={
                loadingStatus
                  ? []
                  : _.uniqBy(
                      status ? [status, ...data.statuses] : data.statuses,
                      "id"
                    )
              }
              selectedValues={status ? [status] : []}
              onChange={(event, newValue) => {
                onUpdateIssueStatus(newValue);
                setStatus(newValue);
                handleClose();
              }}
              hasMore={false}
              fetchMore={() => {}}
              noOptionsText="No status found"
              renderOption={option => (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs>
                    <Typography variant="h6">{option.name}</Typography>
                    <Typography variant="caption">
                      {option.description}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            />
          )}
        </Can>
      </Paper>
    </Box>
  );
}

IssueStatus.defaultProps = {
  status: null
};

IssueStatus.propTypes = {
  status: propType.object,
  open: propType.bool.isRequired,
  onUpdateIssueStatus: propType.func.isRequired
};

export default IssueStatus;
