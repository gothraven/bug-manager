import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  bar: { margin: "10px 5px" },
  CreateOrEditCard: {
    margin: "7px"
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    "& button": {
      fontSize: 9
    }
  }
}));

function ProjectEdition(props) {
  const { project, id, onSubmit, onCancel } = props;
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const classes = useStyles();

  return (
    <div className={classes.CreateOrEditCard}>
      <TextField
        margin="dense"
        id="name"
        label="Project Name"
        type="text"
        variant="outlined"
        fullWidth
        defaultValue={title}
        onChange={event => setTitle(event.target.value)}
      />
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
      <div className={classes.buttonsContainer}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => onSubmit({ title, description, id })}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

ProjectEdition.propTypes = {
  id: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProjectEdition;
