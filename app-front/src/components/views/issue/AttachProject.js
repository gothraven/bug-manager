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
import DoneIcon from "@material-ui/icons/Done";
import { usePagination } from "../../core/hooks";
import ProjectChip from "../../lib/ProjectChip";
import { Can } from "../../core/Ability";

import useStyles from "./IssueTags.scss";
import SingleAutoCompletePopper from "../../lib/SingleAutoCompletePopper";
import { PROJECTS_QUERY } from "../../core/models/projects/projects.graphql";

function AttachProject(props) {
  const classes = useStyles();
  //   const { onProjectAdded, onProjectRemoved } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [project, setProject] = useState(props.project);
  const [pendingProject, setPendingProject] = useState(props.project);
  const {
    data,
    loading: loadingProjects,
    fetchMore
  } = usePagination(PROJECTS_QUERY, "projects", {
    notifyOnNetworkStatusChange: true
  });

  const handleClick = event => {
    setPendingProject(project);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProject(pendingProject);

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
        <Grid container justify="space-between" alignContent="center">
          <Typography
            variant="h3"
            style={{ textTransform: "uppercase", color: "#2E231C" }}
          >
            Project
          </Typography>
          <Can I="edit" this="Project">
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

        {!project ? (
          <Typography style={{ marginTop: 10 }}>None yet</Typography>
        ) : (
          <ProjectChip project={project} style={{ marginTop: 5 }} />
        )}

        <SingleAutoCompletePopper
          open={open}
          anchorEl={anchorEl}
          title="Choose project"
          loading={loadingProjects}
          onClose={handleClose}
          pendingValues={pendingProject}
          allValues={
            loadingProjects
              ? []
              : _.uniqBy([project, ...data.projects.edges], "id")
          }
          selectedValues={project}
          onChange={(event, newValue) => setPendingProject(newValue)}
          hasMore={hasMore}
          fetchMore={fetchMore}
          noOptionsText="No project found"
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
            </>
          )}
        />
      </Paper>
    </Box>
  );
}

AttachProject.propTypes = {
  project: propType.object.isRequired,
  onProjectAdded: propType.func.isRequired,
  onProjectRemoved: propType.func.isRequired
};

export default AttachProject;
