import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  UPDATE_PROJECT,
  PROJECTS_QUERY,
  DELETE_PROJECT
} from "../../core/models/projects/projects.graphql";

import useStyles from "./ProjectCard.scss";

function ProjectCard(props) {
  const { disabled, project } = props;
  const [edition, setEdition] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [onProjectUpdate, { loading: isProjectUpdatePending }] = useMutation(
    UPDATE_PROJECT,
    {
      variables: { id: project.id, name, description },
      optimisticResponse: {
        __typename: "Mutation",
        updateProject: {
          __typename: "Project",
          id: project.id,
          name,
          description
        }
      },
      update: (proxy, result) => {
        const { updateProject } = result.data;
        const { projects } = proxy.readQuery({ query: PROJECTS_QUERY });
        proxy.writeQuery({
          query: PROJECTS_QUERY,
          data: {
            projects: {
              ...projects,
              edges: projects.edges.map(edge =>
                edge.id === project.id ? updateProject : edge
              )
            }
          }
        });
      }
    }
  );
  const [onDeleteProject, { loading: isProjectDeletePending }] = useMutation(
    DELETE_PROJECT,
    {
      variables: { id: project.id },
      optimisticResponse: {
        __typename: "Mutation",
        deleteProject: true
      },
      update: (proxy, result) => {
        const { deleteProject } = result.data;
        if (deleteProject) {
          const { projects } = proxy.readQuery({ query: PROJECTS_QUERY });
          proxy.writeQuery({
            query: PROJECTS_QUERY,
            data: {
              projects: {
                ...projects,
                edges: projects.edges.filter(edge => edge.id !== project.id)
              }
            }
          });
        }
      }
    }
  );

  const isPending = isProjectUpdatePending || isProjectDeletePending;
  const classes = useStyles();

  useEffect(() => {
    setName(project.name);
    setDescription(project.description || "");
  }, [project]);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardTitle}
        action={
          disabled
            ? []
            : [
              <IconButton
                key={0}
                color={edition ? "primary" : "default"}
                aria-label="edit"
                disabled={isPending}
                onClick={() => setEdition(!edition)}
              >
                <EditIcon />
              </IconButton>,
              <IconButton
                key={1}
                aria-label="delete"
                disabled={isPending}
                onClick={onDeleteProject}
              >
                <CloseIcon />
              </IconButton>
            ]
        }
      />
      <CardContent>
        {edition ? (
          <TextField
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            variant="outlined"
            fullWidth
            defaultValue={name}
            onChange={event => setName(event.target.value)}
          />
        ) : (
            <Typography variant="h3" color="textPrimary" component="h3">
              {name}
            </Typography>
          )}
        {edition ? (
          <TextField
            label="Description"
            variant="outlined"
            multiline
            margin="dense"
            rows="4"
            fullWidth
            defaultValue={description}
            onChange={event => setDescription(event.target.value)}
          />
        ) : (
            <Typography variant="body1" color="textSecondary" component="p">
              {description}
            </Typography>
          )}
        {edition && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={isPending}
            onClick={() => {
              onProjectUpdate();
              setEdition(false);
            }}
          >
            Save
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

ProjectCard.defaultProps = {
  disabled: false
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default ProjectCard;
