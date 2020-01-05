import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IssueComment from "./IssueComment";
import IssueHistory from "./IssueHistory";
import IssueTags from "./IssueTags";
import IssueAssignees from "./IssueAssignees";
import {
  ISSUE_QUERY,
  ISSUE_ADD_TAG,
  ISSUE_REMOVE_TAG,
  ISSUE_ATTACH_TO_PROJECT
} from "../../core/models/issues/issues.graphql";
import Loading from "../../lib/Loading";
import AttachProject from "./AttachProject";

function IssuePage() {
  const { id } = useParams();
  const { data, loading } = useQuery(ISSUE_QUERY, { variables: { id } });
  const [onIssueAddTag] = useMutation(ISSUE_ADD_TAG);
  const [onIssueRemoveTag] = useMutation(ISSUE_REMOVE_TAG);

  const [onAttachProject] = useMutation(ISSUE_ATTACH_TO_PROJECT);
  // const [onDetatchProject] = useMutation(ISSUE_ATTACH_TO_PROJECT);

  if (loading) {
    return <Loading />;
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
          <IssueTags
            tags={issue.tags}
            onTagAdded={tag => {
              onIssueAddTag({
                variables: { id: issue.id, tagId: tag.id },
                update: (proxy, result) => {
                  const { addTag } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY,
                    variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: {
                      issue: {
                        ...cachedIssue,
                        tags: addTag.tags,
                        changes: addTag.changes
                      }
                    }
                  });
                }
              });
            }}
            onTagRemoved={tag => {
              onIssueRemoveTag({
                variables: { id: issue.id, tagId: tag.id },
                update: (proxy, result) => {
                  const { removeTag } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY,
                    variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: {
                      issue: {
                        ...cachedIssue,
                        tags: removeTag.tags,
                        changes: removeTag.changes
                      }
                    }
                  });
                }
              });
            }}
          />

          <AttachProject
            project={issue.project}
            onProjectAttached={project => {
              onAttachProject({
                variables: { id: issue.id, projectId: project.id },
                update: (proxy, result) => {
                  const { attachToProject } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY,
                    variables: { id: issue.id }
                  });

                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: {
                      issue: {
                        ...cachedIssue,
                        project: attachToProject.project,
                        changes: attachToProject.changes
                      }
                    }
                  });
                }
              });
            }}
            onProjectDetatched={project => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const {
    issue: { title }
  } = props;

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
      ...comments
        .concat(changes)
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(change => {
          if (change.type === undefined) {
            const comment = change;
            return (
              <IssueComment
                key={comment.id}
                user={comment.creator}
                content={comment.content}
              />
            );
          }
          return <IssueHistory key={change.id} change={change} />;
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
