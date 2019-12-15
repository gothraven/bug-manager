import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectCard from "./ProjectCard";
import {
  PROJECTS_QUERY,
  CREATE_PROJECT
} from "../../core/models/projects/projects.graphql";
import { Can, AbilityContext } from "../../core/Ability";
import { usePagination } from "../../core/hooks";
import Loading from "../../lib/Loading";
import SafeCheck from "../../lib/SafeCheck";

function ProjectsView() {
  const [open, setOpen] = useState(true);

  const ability = useContext(AbilityContext)
  const { data, loading: loadingProjects, fetchMore } = usePagination(
    PROJECTS_QUERY,
    "projects"
  );
  const [onCreateProject, { loading: isProjectCreatePending }] = useMutation(
    CREATE_PROJECT,
    {
      variables: {
        name: "Project X",
        description: "Lorem ipsum dolor sit amet"
      },
      update: (proxy, result) => {
        const { createProject } = result.data;
        const { projects } = proxy.readQuery({ query: PROJECTS_QUERY });
        proxy.writeQuery({
          query: PROJECTS_QUERY,
          data: {
            projects: { ...projects, edges: [createProject, ...projects.edges] }
          }
        });
      }
    }
  );

  if (loadingProjects) {
    return <Loading />;
  }

  const { hasNextPage } = data.projects.pageInfo;

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <SafeCheck
        action={() => { }}
        title='IRREVESIBLE ACTION'
        content='Are you sure to delete all projects ?'
        opened={open}
        handleCancel={() => setOpen(false)}
        handleConfirm={() => { }}
      />

      <Typography variant="h1" component="h1" gutterBottom>
        All Projects
      </Typography>
      <Grid item>
        <Grid container direction="row" alignItems="flex-start">
          {data.projects.edges.map(node => {
            if (node == null) {
              return null;
            }
            return (
              <Grid key={node.id} item xs={4}>
                <ProjectCard disabled={!ability.can("edit", "Project")} project={node} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {hasNextPage && <Button onClick={fetchMore}>load more</Button>}
      <Can I="create" a="Project">
        {() => (
          <Grid
            item
            style={{ display: "grid", justifyContent: "center", padding: 30 }}
          >
            <Fab
              color="primary"
              aria-label="add"
              onClick={onCreateProject}
              disabled={isProjectCreatePending}
            >
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </Can>
    </Grid>
  );
}

export default ProjectsView;
