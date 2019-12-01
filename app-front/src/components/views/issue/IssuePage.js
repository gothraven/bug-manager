import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IssueComment from "./IssueComment";
import IssueHistory from "./IssueHistory";
import IssueTags from "./IssueTags";
import IssueAssignees from "./IssueAssignees";
import { ISSUE_QUERY } from "../../core/models/issues/issues.queries";
import Loading from "../../lib/Loading";

function IssuePage() {
  const { id } = useParams();
  const { data, loading } = useQuery(ISSUE_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <Loading />
  }

  const { issue } = data;

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <IssueHeader issue={issue} />
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs>
          <IssueBody issue={issue} />
        </Grid>
        <Grid item xs={3}>
          <IssueAssignees assignees={issue.assignedUsers} />
          <IssueTags tags={issue.tags} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const { issue: { title } } = props;

  return (
    <Typography variant="h1" component="h1" gutterBottom>
      # {title}
    </Typography>
  );
}

function IssueBody(props) {
  const { issue } = props;
  const { comments, changes } = issue;

  function issueBodyNodes() {
    return [
      ...comments.concat(changes)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(change => {
          if (change.type === undefined) {
            const comment = change;
            return (
              <IssueComment key={comment.id} user={comment.creator} content={comment.content} />
            );
          }
          return (
            <IssueHistory key={change.id} change={change} />
          );
        })
    ];
  }

  return (
    <>
      {issueBodyNodes()}
      <IssueComment creation user={issue.creator} />
    </>
  );
}

IssueHeader.propTypes = {
  issue: PropType.object.isRequired
};

IssueBody.propTypes = {
  issue: PropType.object.isRequired
};

export default IssuePage;
