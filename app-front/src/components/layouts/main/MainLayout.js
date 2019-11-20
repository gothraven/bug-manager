import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "../../lib/Loading";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const MainLayout = props => {
  const { children } = props;
  const classes = useStyles();
  const queryData = useLazyLoadQuery(
    graphql`
      query MainLayoutViewQuery {
        ...DashboardView_issues
        ...ProjectsView_projects
        ...TagsView_tags
        ...MeQuery_me
      }
    `
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar queryData={queryData} />
      <main className={classes.content}>
        <Suspense fallback={<Loading />}>
          {React.cloneElement(children, { queryData })}
        </Suspense>
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
