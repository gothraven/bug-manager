/* eslint-disable no-nested-ternary */
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
import Fab from "@material-ui/core/Fab";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Input from "@material-ui/core/Input";
import Loading from "../../lib/Loading";
import IssueItem from "./IssueItem";
import {
  ISSUES_QUERY,
  ISSUES_STATISTICS_QUERY
} from "../../core/models/issues/issues.graphql";

function prepareFilters(input = "", tab = 0) {
  const filter = {
    open: tab === 0 ? undefined : tab === 1,
    title: input.length > 0 ? input : undefined
  };
  return filter;
}

function DashboardView() {
  const {
    data: statisticsData,
    loading: statisticsLoading
  } = useQuery(ISSUES_STATISTICS_QUERY, { fetchPolicy: "cache-and-network" });
  const [searchInput, setSearchInput] = useState("");
  const [validatedSearchInput, setValidatedSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading: issuesLoading, fetchMore } = useQuery(ISSUES_QUERY, {
    variables: {
      cursor: "",
      filters: prepareFilters(validatedSearchInput, activeTab)
    },
    fetchPolicy: "cache-and-network"
  });
  const loading = issuesLoading || statisticsLoading;

  const onTabChanged = value => {
    setActiveTab(value);
  };

  const onInputChanged = value => {
    setSearchInput(value);
  };

  const loadMore = useCallback(() => {
    const { endCursor, hasNextPage } = data.issues.pageInfo;

    if (loading || !hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        cursor: endCursor,
        filters: prepareFilters(validatedSearchInput, activeTab)
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
  }, [data, loading, fetchMore, validatedSearchInput, activeTab]);

  if (statisticsLoading) return <Loading />;

  const { openCount, closedCount } = statisticsData.issuesStatistics;

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
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs={5}>
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
                          <strong>{openCount + closedCount}</strong> All
                        </Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <ErrorIcon style={{ color: "green" }} />
                        <Typography style={{ marginLeft: 10 }}>
                          <strong>{openCount}</strong> Opened Issues
                        </Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <ErrorIcon style={{ color: "red" }} />
                        <Typography style={{ marginLeft: 10 }}>
                          <strong>{closedCount}</strong> Closed Issues
                        </Typography>
                      </>
                    }
                  />
                </Tabs>
              </Grid>
              <Grid item xs={4} container alignItems="center" spacing={2}>
                <Input
                  onChange={e => onInputChanged(e.target.value)}
                  value={searchInput}
                  onKeyUp={e => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      setValidatedSearchInput(searchInput);
                    }
                  }}
                  autoFocus
                  placeholder="Search for an issue ..."
                  style={{ marginLeft: 20, flex: 1 }}
                />
                <Grid item xs={2}>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => setValidatedSearchInput(searchInput)}
                  >
                    <SearchIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          {issuesLoading ? (
            <Loading />
          ) : data.issues.edges.length > 0 ? (
            data.issues.edges.map(node =>
              node == null ? null : <IssueItem key={node.id} issue={node} />
            )
          ) : (
            <p
              style={{
                fontSize: 100,
                fontWeight: 1000,
                color: "#c1c1c1",
                padding: 100,
                textAlign: "center"
              }}
            >
              No {activeTab === 1 && "Open"}
              {activeTab === 2 && "Closed"} Issues yet !
            </p>
          )}
        </List>
      </Grid>
      {issuesLoading
        ? null
        : data.issues.pageInfo.hasNextPage && (
            <Button onClick={loadMore}>load more</Button>
          )}
    </Grid>
  );
}

export default DashboardView;
