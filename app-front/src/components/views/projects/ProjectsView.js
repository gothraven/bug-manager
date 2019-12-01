import React from "react";
import { useMutation } from "@apollo/react-hooks";
import propTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProjectCard from "./ProjectCard";
import { ADMIN } from "../../core/constants";
import { PROJECTS_QUERY, CREATE_PROJECT } from "../../core/models/projects/projects.queries";
import { usePagination } from "../../core/hooks";
import Loading from "../../lib/Loading";


function ProjectsView(props) {
  const { me } = props;
  const { data, loading: loadingProjects, fetchMore } = usePagination(PROJECTS_QUERY, 'projects');
  const [onCreateProject, { loading: isProjectCreatePending }] = useMutation(CREATE_PROJECT, {
    variables: { name: "Project X", description: "Lorem ipsum dolor sit amet" },
    update: (proxy, result) => {
      const { createProject } = result.data;
      const { projects } = proxy.readQuery({ query: PROJECTS_QUERY });
      proxy.writeQuery({
        query: PROJECTS_QUERY,
        data: {
          projects: { ...projects, edges: [createProject, ...projects.edges] }
        },
      });
    }
  });

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
                <ProjectCard disabled={me.role !== ADMIN} project={node} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {hasNextPage && <Button onClick={fetchMore}>load more</Button>}
      {me.role === ADMIN &&
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
      }
    </Grid>
  );
}

ProjectsView.defaultProps = {
  me: null,
};

ProjectsView.propTypes = {
  me: propTypes.shape({
    id: propTypes.string,
    name: propTypes.string,
    email: propTypes.string,
    role: propTypes.string,
  }),
};

export default ProjectsView;
