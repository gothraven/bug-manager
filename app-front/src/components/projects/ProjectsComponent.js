import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  bar: { margin: "10px 5px" },
  CreateOrEditCard: {
    margin: "7px"
  },
  card: {
    width: 345,
    margin: "10px 5px",
    borderBottom: "2px solid #0B9ED9"
  },
  cardTitle: {
    marginRight: "0px",
    "& button": {
      transition: "background .3s ease-in-out",
      "&:last-child:hover": {
        // backgroundColor: theme.colors('red'),
      },
      "& svg": {
        fontSize: 17
      }
    }
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

function createProject(params) {
  const { title, description } = params;
  const { id } = projects[projects.length - 1];
  projects.push({ title, description, id: id + 1 });
}

function editProject(id, values) {
  const { title, description } = values;
  const old = projects.filter(p => p.id === id)[0];
  const index = projects.indexOf(old);
  if (index >= 0) {
    projects[index].title = title;
    projects[index].description = description;
  }
}

function removeProject(id) {
  const old = projects.filter(p => p.id === id)[0];
  const index = projects.indexOf(old);
  if (index <= 0) {
    // React IS NOT Reactive !!
    projects.splice(index, 1);
  }
}

export default function ProjectsComponent() {
  const [open, setOpen] = React.useState(false);
  const openDialogue = () => setOpen(true);
  const closeDialogue = () => setOpen(false);
  const classes = useStyles();

  return (
    <div>
      <Box
        display="flex"
        className={classes.bar}
        alignItems="right"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Fab variant="extended" color="primary" onClick={openDialogue}>
          <AddIcon />
          New Project
        </Fab>
        <div>
          <IconButton size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
        </div>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.bar}
        flexWrap="wrap"
      >
        {projects.reverse().map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={closeDialogue}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>CREATE NEW PROJECT</DialogTitle>
        <CreateOrEditProject
          project={{ name: "", description: "" }}
          onSubmit={project => {
            createProject(project);
            closeDialogue();
          }}
          onCancel={() => closeDialogue()}
        />
      </Dialog>
    </div>
  );
}

function CreateOrEditProject(props) {
  const { project, id, onSubmit, onCancel } = props;
  const [title, setTitle] = React.useState(project.title || "");
  const [description, setDescription] = React.useState(
    project.description || ""
  );

  const classes = useStyles();

  return (
    <div className={classes.CreateOrEditCard}>
      <TextField
        margin="dense"
        id="name"
        label="Project Name"
        type="text"
        fullWidth
        defaultValue={title}
        onChange={event => setTitle(event.target.value)}
      />
      <TextField
        label="Description"
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

function ProjectCard(props) {
  const { project } = props;
  const [edition, setEdition] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardTitle}
        action={
          <div>
            <IconButton
              color={edition ? "primary" : ""}
              aria-label="edit"
              onClick={() => setEdition(!edition)}
            >
              <EditIcon />
            </IconButton>
            {!edition && (
              <IconButton
                aria-label="delete"
                onClick={() => removeProject(project.id)}
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        }
        title={edition ? "Modification ..." : project.title}
      />

      <CardContent>
        {!edition ? (
          <Typography variant="body1" color="textSecondary" component="p">
            {project.description}
          </Typography>
        ) : (
          <CreateOrEditProject
            project={project}
            onSubmit={values => {
              editProject(project.id, values);
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
  project: PropTypes.object.isRequired
};

CreateOrEditProject.propTypes = {
  id: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const projects = [
  {
    id: 1,
    title: "Project Name 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 2,
    title: "Project Name 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 3,
    title: "Project Name 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 4,
    title: "Project Name 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 5,
    title: "Project Name 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 6,
    title: "Project Name 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 7,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 8,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 9,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 10,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 11,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    id: 12,
    title: "Project Name 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  }
];
