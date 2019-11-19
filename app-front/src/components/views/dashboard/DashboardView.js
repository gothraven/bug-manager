import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { graphql, usePaginationFragment } from "react-relay/hooks";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";

import IssueItem from "./IssueItem";

const useStyles = makeStyles(() => ({
  listHeaderBox: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    alignItems: "center"
  }
}));

function DashboardView(props) {
  const { queryData } = props;
  const classes = useStyles();
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment DashboardView_issues on Query
        @argumentDefinitions(
          first: { type: "PositiveInt", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "IssuesPaginationQuery") {
        issues(first: $first, after: $after)
          @connection(key: "Query_issues", filters: []) {
          edges {
            node {
              id
              createdAt
              updatedAt
              title
              creator {
                id
                name
              }
              status {
                id
                name
              }
              open
              assignedUsers {
                id
                name
              }
              tags {
                id
                name
                color
              }
              project {
                name
              }
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
          {data.issues.edges.map(edge => {
            if (edge == null || edge.node == null) {
              return null;
            }
            return <IssueItem key={edge.node.id} issue={edge.node} />;
          })}
        </List>
      </Grid>
      <Button onClick={loadMore} disabled={!hasNext}>
        load more
      </Button>
    </Grid>
  );
}

DashboardView.defaultProps = {
  queryData: undefined
};

DashboardView.propTypes = {
  queryData: PropTypes.object
};

export default DashboardView;
