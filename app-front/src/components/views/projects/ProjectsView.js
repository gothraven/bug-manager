import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

import ProjectEdition from "./ProjectEdition";
import ProjectCard from "./ProjectCard";

const testProjects = [
  {
    id: 1,
    title: "Project Name 1",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: 2,
    title: "Project Name 2",
    description: "Lorem ipsum dolor sit amet"
  },
  {
    id: 3,
    title: "Project Name 3",
    description: "Lorem ipsum dolor sit amet"
  }
];

function ProjectsView() {
  const [projects, setProjects] = useState(testProjects);
  const [open, setOpen] = useState(false);
  const closeDialogue = () => setOpen(false);

  function createProjectHandler(data) {
    const { title, description } = data;
    const { id } = projects[projects.length - 1];
    setProjects([...projects, { title, description, id: id + 1 }]);
  }

  function updateProjectHandler(id, data) {
    const { title, description } = data;
    setProjects(
      projects.map(p => {
        if (p.id === id) {
          return { ...p, title, description };
        }
        return p;
      })
    );
  }

  function deleteProjectHandler(id) {
    setProjects(projects.filter(p => p.id !== id));
  }

  return (
    <Grid container xs={12} direction="column" spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Fab variant="extended" color="primary" onClick={() => setOpen(true)}>
            <AddIcon />
          </Fab>
          <div>
            <IconButton size="small">
              <ChevronLeft />
            </IconButton>
            <IconButton size="small">
              <ChevronRight />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          xs={12}
          justify="space-evenly"
          alignItems="flex-start"
        >
          {projects.reverse().map(project => (
            <Grid item xs={6}>
              <ProjectCard
                key={project.id}
                project={project}
                onUpdate={updateProjectHandler}
                onDelete={deleteProjectHandler}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={closeDialogue}>
        <ProjectEdition
          project={{ name: "", description: "" }}
          onSubmit={project => {
            createProjectHandler(project);
            closeDialogue();
          }}
          onCancel={() => closeDialogue()}
        />
      </Dialog>
    </Grid>
  );
}

export default ProjectsView;
