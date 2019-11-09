
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import ProjectEdition from "./ProjectEdition";

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
  const { project, onUpdate, onDelete } = props;
  const [edition, setEdition] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardTitle}
        action={
          <>
            <IconButton
              color={edition ? "primary" : "default"}
              aria-label="edit"
              onClick={() => setEdition(!edition)}
            >
              <EditIcon />
            </IconButton>
            {
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(project.id)}
              >
                <CloseIcon />
              </IconButton>
            }
          </>
        }
      />
      <CardContent>
        {!edition ? (
          [
            <Typography key={0} variant="h3" color="textPrimary" component="h3">
              {project.title}
            </Typography>,
            <Typography key={1} variant="body1" color="textSecondary" component="p">
              {project.description}
            </Typography>
          ]
        ) : (
          <ProjectEdition
            project={project}
            onSubmit={values => {
              onUpdate(project.id, values);
              setEdition(false);
            }}
            onCancel={() => setEdition(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProjectCard;
