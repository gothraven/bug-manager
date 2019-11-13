import React, { useCallback } from "react";
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment
} from "react-relay/hooks";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ProjectCard from "./ProjectCard";
import { useCreateProject } from "./mutations/ProjectMutations";


function ProjectsView() {
  const [isProjectCreatePending, onCreateProject] = useCreateProject();
  const queryData = useLazyLoadQuery(
    graphql`
      query ProjectsViewQuery {
        ...ProjectsView_projects
      }
    `
  );
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment ProjectsView_projects on Query
        @argumentDefinitions(
          first: { type: "PositiveInt", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "ProjectsPaginationQuery") {
        projects(first: $first, after: $after)
          @connection(key: "Query_projects", filters: []) {
          edges {
            node {
              id
              name
              description
            }
          }
        }
      }
    `,
    queryData
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

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
          {data.projects.edges.map(edge => {
            if (edge == null || edge.node == null) {
              return null;
            }
            return (
              <Grid key={edge.node.id} item xs={6}>
                <ProjectCard project={edge.node} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Button onClick={loadMore} disabled={!hasNext}>
        load more
      </Button>
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
    </Grid>
  );
}

export default ProjectsView;
