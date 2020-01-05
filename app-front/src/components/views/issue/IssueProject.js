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
import AutoCompletePopper from "../../lib/AutoCompletePopper";
import { PROJECTS_QUERY } from "../../core/models/projects/projects.graphql";
import { usePagination } from "../../core/hooks";
import { Can } from "../../core/Ability";

import useStyles from "./IssueTags.scss";

function IssueProject(props) {
  const classes = useStyles();
  const { onAttachToProject, onDetachFromProject } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [project, setProject] = useState(props.project);
  const {
    data,
    loading: loadingProjects,
    fetchMore
  } = usePagination(PROJECTS_QUERY, "projects", {
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
  let hasMore = false;

  if (data && data.projects && data.projects.pageInfo) {
    const { hasNextPage } = data.projects.pageInfo;
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
              Project
            </Typography>
            <Can I="use" this="AttachProject">
              {() => (
                <IconButton component="span" style={{ padding: 0 }} onClick={handleClick}>
                  <SettingsIcon />
                </IconButton>
              )}
            </Can>
          </Grid>
          <Divider />
          <Grid item container justify="space-between" spacing={2}>
            <Grid item>
              <Typography variant={project ? "h6" : undefined}>
                {project ? project.name : "No project"}
              </Typography>
            </Grid>
            <Can I="use" this="AttachProject">
              {() => (
                <Grid item>
                  <CloseIcon
                    className={classes.close}
                    style={{ visibility: project ? "visible" : "hidden" }}
                    onClick={() => {
                      onDetachFromProject(project);
                      setProject(null);
                    }}
                  />
                </Grid>
              )}
            </Can>
          </Grid>
        </Grid>
        <Can I="use" this="AttachProject">
          {() => (
            <AutoCompletePopper
              open={open}
              anchorEl={anchorEl}
              title="Attach to project"
              loading={loadingProjects}
              onClose={handleClose}
              pendingValues={project ? [] : [project]}
              allValues={
                loadingProjects
                  ? []
                  : _.uniqBy(project ? [project, ...data.projects.edges] : data.projects.edges, "id")
              }
              selectedValues={project ? [project] : []}
              onChange={(event, newValue) => {
                if (project === null) {
                  onAttachToProject(newValue);
                } else if (project !== newValue) {
                  onDetachFromProject(project);
                  onAttachToProject(newValue);
                }
                setProject(newValue);
                handleClose();
              }}
              hasMore={hasMore}
              fetchMore={fetchMore}
              noOptionsText="No project found"
              renderOption={(option) => (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs>
                    <Typography variant="h6">{option.name}</Typography>
                    <Typography variant="caption">{option.description}</Typography>
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

IssueProject.defaultProps = {
  project: null,
};

IssueProject.propTypes = {
  project: propType.object,
  onAttachToProject: propType.func.isRequired,
  onDetachFromProject: propType.func.isRequired
};

export default IssueProject;
