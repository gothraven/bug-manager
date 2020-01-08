import React, { useState } from "react";
import propType from "prop-types";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { useQuery } from "@apollo/react-hooks";
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import { STATUSES_QUERY } from "../../core/models/statuses/statuses.graphql";
import { Can } from "../../core/Ability";
import useStyles from "./IssueStatus.scss";

function showName(name, statusOpened = false) {
    if(statusOpened) return name;
    return "Closed"
}

function IssueStatus(props) {
  const classes = useStyles();
  const { onAttachToStatus, onDetachFromStatus, statusOpened = false } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(props.status);
  const { data, error, loading : loadingStatus, fetchMore } = useQuery(STATUSES_QUERY, { notifyOnNetworkStatusChange: true});
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  console.error(error);

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  let hasMore = false;

  if (data && data.statuses && data.statuses.pageInfo) {
    const { hasNextPage } = data.status.pageInfo;
    hasMore = hasNextPage;
  }


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
            { statusOpened && 
            <Can I="use" this="AttachProject">
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
            }
          </Grid>
          
          <Divider />

          <Grid item container justify="space-between" spacing={2}>
            <Grid item>
              <Typography variant={status ? "h6" : undefined}>
                { showName(status ? status.name : "-", statusOpened) }
              </Typography>
            </Grid>
            <Can I="use" this="AttachProject">
              {() => (
                <Grid item>
               { statusOpened && 
                  <CloseIcon
                    className={classes.close}
                    style={{ visibility: status ? "visible" : "hidden" }}
                    onClick={() => {
                      onDetachFromStatus(status);
                      setStatus(null);
                    }}
                  />
                }
                </Grid>
              )}
            </Can>
          </Grid>
        </Grid>
        <Can I="use" this="AttachProject">
          {() => (
              statusOpened &&
            <AutoCompletePopper
              open={open}
              anchorEl={anchorEl}
              title="Attach to status"
              loading={loadingStatus}
              onClose={handleClose}
              pendingValues={status ? [] : [status]}
              allValues={
                loadingStatus
                  ? []
                  : _.uniqBy(
                    status
                        ? [status, ...data.statuses.edges]
                        : data.statuses.edges,
                      "id"
                    )
              }
              selectedValues={status ? [status] : []}
              onChange={(event, newValue) => {
                if (status === null) {
                  onAttachToStatus(newValue);
                } else if (status !== newValue) {
                  onDetachFromStatus(status);
                  onAttachToStatus(newValue);
                }
                setStatus(newValue);
                handleClose();
              }}
              hasMore={hasMore}
              fetchMore={fetchMore}
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
  status: null,
  statusOpened: false
};

IssueStatus.propTypes = {
  status: propType.object,
  statusOpened: propType.bool,
  onAttachToStatus: propType.func.isRequired,
  onDetachFromStatus: propType.func.isRequired
};

export default IssueStatus;
