import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {
  useDeleteProject,
  useUpdateProject
} from "./mutations/ProjectMutations";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 350,
    margin: 10,
    borderBottom: "2px solid #0B9ED9"
  },
  cardTitle: {
    marginRight: "0px",
    "& button": {
      transition: "background .3s ease-in-out",
      "& svg": {
        fontSize: 20
      }
    }
  }
}));

function ProjectCard(props) {
  const { project } = props;
  const [edition, setEdition] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [isProjectUpdatePending, onUpdateProject] = useUpdateProject(
    project.id,
    name,
    description
  );
  const [isProjectDeletePending, onDeleteProject] = useDeleteProject(
    project.id
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
        action={[
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
        ]}
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
              onUpdateProject();
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

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
