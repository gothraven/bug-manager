import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  graphql,
  useLazyLoadQuery
} from "react-relay/hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
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
        ...ProjectsView_projects
        ...TagsView_tags
      }
    `
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>
        {React.cloneElement(children, { queryData })}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
