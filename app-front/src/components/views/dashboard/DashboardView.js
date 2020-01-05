import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ErrorIcon from "@material-ui/icons/Error";
import SearchIcon from "@material-ui/icons/Search";
import AllInclusiveRoundedIcon from "@material-ui/icons/AllInclusiveRounded";

import { Input, InputAdornment, Tab, Tabs } from "@material-ui/core";
import Loading from "../../lib/Loading";
import IssueItem from "./IssueItem";

import { ISSUES_QUERY } from "../../core/models/issues/issues.graphql";

function DashboardView() {
  const { data, loading, fetchMore } = useQuery(ISSUES_QUERY);

  const [searchInput, setSearchInput] = useState("");

  const [activeTab, setActiveTab] = useState(0);

  const [filters, setFilters] = useState({});

  const onTabChanged = value => {
    setActiveTab(value);
    applyFilters();
  };

  const onInputChanged = value => {
    setSearchInput(value);
    applyFilters();
  };

  const applyFilters = () => {
    let f = {};

    if (activeTab === 0) f.open = null;
    else f.open = { $eq: activeTab === 2 };

    if (searchInput && searchInput.length > 0)
      f.title = { text: { search: searchInput } };

    setFilters(f);
    refreshData();
  };

  const refreshData = useCallback(() => {
    fetchMore({
      variables: {
        filters: JSON.stringify(filters)
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.issues.edges;
        const { pageInfo } = fetchMoreResult.issues;

        return newEdges.length
          ? {
              issues: {
                __typename: previousResult.issues.__typename,
                edges: [...newEdges],
                pageInfo
              }
            }
          : {};
      }
    });
  }, [fetchMore, filters]);

  const loadMore = useCallback(() => {
    const { endCursor, hasNextPage } = data.tags.pageInfo;

    if (loading || !hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        cursor: endCursor,
        filters: JSON.stringify(filters)
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.issues.edges;
        const { pageInfo } = fetchMoreResult.issues;

        return newEdges.length
          ? {
              issues: {
                __typename: previousResult.issues.__typename,
                edges: [...previousResult.issues.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  }, [data, loading, fetchMore, filters]);

  if (loading) return <Loading />;

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
            <Tabs
              value={activeTab}
              onChange={(_, value) => onTabChanged(value)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab
                label={
                  <>
                    <AllInclusiveRoundedIcon />
                    <Typography style={{ marginLeft: 10 }}>
                      <strong>15</strong> All
                    </Typography>
                  </>
                }
              />

              <Tab
                label={
                  <>
                    <ErrorIcon style={{ color: "green" }} />
                    <Typography style={{ marginLeft: 10 }}>
                      <strong>15</strong> Opened Issues
                    </Typography>
                  </>
                }
              />

              <Tab
                label={
                  <>
                    <ErrorIcon style={{ color: "red" }} />
                    <Typography style={{ marginLeft: 10 }}>
                      <strong>0</strong> Closed Issues
                    </Typography>
                  </>
                }
              />
            </Tabs>

            <Input
              onChange={event => onInputChanged(event.target.value)}
              value={searchInput}
              endAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
              autoFocus
              placeholder="search an issue ..."
              style={{ marginLeft: 20, flex: 1 }}
            />
          </ListItem>

          {data.issues.edges.map(node =>
            node == null ? null : <IssueItem key={node.id} issue={node} />
          )}
        </List>
      </Grid>
      {hasNextPage && <Button onClick={loadMore}>load more</Button>}
    </Grid>
  );
}

export default DashboardView;
