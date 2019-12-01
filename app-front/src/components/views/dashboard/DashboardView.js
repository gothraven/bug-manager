import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";
import IssueItem from "./IssueItem";
import Loading from "../../lib/Loading";
import { ISSUES_QUERY } from "../../core/models/issues/issues.queries";

import useStyles from './DashboardView.scss';


function DashboardView() {
  const classes = useStyles();
  const { data, loading, fetchMore } = useQuery(ISSUES_QUERY);

  const loadMore = useCallback(() => {
    const { endCursor, hasNextPage } = data.tags.pageInfo;

    if (loading || !hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        cursor: endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.issues.edges;
        const { pageInfo } = fetchMoreResult.issues;

        return newEdges.length
          ? {
            issues: {
              __typename: previousResult.issues.__typename,
              edges: [...previousResult.issues.edges, ...newEdges],
              pageInfo,
            },
          }
          : previousResult;
      }
    });

  }, [data, loading, fetchMore]);

  if (loading) {
    return <Loading />;
  }

  const { hasNextPage } = data.issues.pageInfo;

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        All Issues
      </Typography>
      <Grid item xs={12}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem divider>
            <Box className={classes.listHeaderBox}>
              <ErrorIcon style={{ color: "green" }} />
              <Typography>39 Issues Opened</Typography>
            </Box>
            <Box className={classes.listHeaderBox} style={{ marginLeft: 10 }}>
              <ErrorIcon style={{ color: "red" }} />
              <Typography>39 Issues Opened</Typography>
            </Box>
          </ListItem>
          {data.issues.edges.map(node => {
            if (node == null) {
              return null;
            }
            return <IssueItem key={node.id} issue={node} />;
          })}
        </List>
      </Grid>
      {hasNextPage && <Button onClick={loadMore}>load more</Button>}
    </Grid>
  );
}

export default DashboardView;
