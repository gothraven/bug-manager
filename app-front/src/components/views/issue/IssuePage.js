import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import IssueComment from "./IssueComment";
import IssueHistory from "./IssueHistory";
import IssueTags from "./IssueTags";
import IssueAssignees from "./IssueAssignees";
import Loading from "../../lib/Loading";
import IssueProject from "./IssueProject";
import { Can } from "../../core/Ability";
import { useMe } from "../../core/models/users/users.hooks";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from "../../core/models/comments/comments.graphql";
import {
  ISSUE_QUERY,
  ISSUE_ADD_TAG,
  ISSUE_REMOVE_TAG,
  ISSUE_ASSIGNE_USER,
  ISSUE_UNASSIGN_USER,
  ISSUE_UPDATE,
  ISSUE_CLOSE,
  ISSUE_REOPEN,
  ISSUE_ATTACH_TO_PROJECT,
  ISSUE_DETATCH_FROM_PROJECT
} from "../../core/models/issues/issues.graphql";

import useStyle from "./IssuePage.scss";

function IssuePage() {
  const { id } = useParams();
  const { me } = useMe();
  const { data, loading } = useQuery(ISSUE_QUERY, { variables: { id } });
  const [onIssueAddTag] = useMutation(ISSUE_ADD_TAG, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });
  const [onIssueRemoveTag] = useMutation(ISSUE_REMOVE_TAG, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });
  const [onIssueAssignUser] = useMutation(ISSUE_ASSIGNE_USER, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });
  const [onIssueUnassignUser] = useMutation(ISSUE_UNASSIGN_USER, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });
  const [onAttachToProject] = useMutation(ISSUE_ATTACH_TO_PROJECT, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });
  const [onDetatchFromProject] = useMutation(ISSUE_DETATCH_FROM_PROJECT, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id } }]
  });

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
      spacing={2}
    >
      <Grid item container direction="column">
        <IssueHeader me={me} issue={issue} />
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
      <Grid item container justify="space-evenly">
        <Grid
          item
          xs={8}
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <IssueBody me={me} issue={issue} />
        </Grid>
        <Grid item xs={3}>
          <IssueAssignees
            assignedUsers={issue.assignedUsers}
            onAssignUser={assigne => {
              onIssueAssignUser({
                variables: { id: issue.id, userId: assigne.id }
              });
            }}
            onUnassignUser={assigne => {
              onIssueUnassignUser({
                variables: { id: issue.id, userId: assigne.id }
              });
            }}
          />
          <IssueTags
            tags={issue.tags}
            onTagAdded={tag => {
              onIssueAddTag({ variables: { id: issue.id, tagId: tag.id } });
            }}
            onTagRemoved={tag => {
              onIssueRemoveTag({ variables: { id: issue.id, tagId: tag.id } });
            }}
          />
          <IssueProject
            project={issue.project}
            onAttachToProject={project => {
              onAttachToProject({
                variables: { id: issue.id, projectId: project.id }
              });
            }}
            onDetachFromProject={project => {
              onDetatchFromProject({
                variables: { id: issue.id, projectId: project.id }
              });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const { issue, me } = props;
  const classes = useStyle();
  const [edit, setEdit] = useState(false);
  const [issueTitle, setIssueTitle] = useState(issue.title);
  const [onIssueUpdateTitle] = useMutation(ISSUE_UPDATE, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
  });
  const [onIssueClose, { loading: isIssueClosePending }] = useMutation(
    ISSUE_CLOSE,
    {
      refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
    }
  );
  const [onIssueReOpen, { loading: isIssueReopenPending }] = useMutation(
    ISSUE_REOPEN,
    {
      refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
    }
  );
  const isPending = isIssueClosePending || isIssueReopenPending;

  const onClickClose = () => {
    onIssueClose({ variables: { id: issue.id } });
  };
  const onClickOpen = () => {
    onIssueReOpen({ variables: { id: issue.id } });
  };

  return (
    <Grid item xs={12} container justify="center">
      <Grid item xs={11} container justify="space-between" alignItems="center">
        <Grid item xs={7}>
          {edit ? (
            <TextField
              fullWidth
              multiline
              classes={{ root: classes.titleTextField }}
              rowsMax="15"
              rows="1"
              value={issueTitle}
              onChange={e => setIssueTitle(e.target.value)}
            />
          ) : (
            <Typography variant="h1" component="h1" gutterBottom>
              # {issue.title}
            </Typography>
          )}
        </Grid>
        {edit ? (
          <Grid item xs={4} container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setIssueTitle(issue.title);
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  onIssueUpdateTitle({
                    variables: { id: issue.id, title: issueTitle }
                  });
                  setEdit(false);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={4} container spacing={1}>
            <Grid item>
              <Can
                do="edit"
                on={me.id === issue.creator.id ? "MyIssue" : "Issue"}
              >
                {() => (
                  <IconButton size="small" onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Can>
            </Grid>
            <Grid item>
              <Can
                do="open/close"
                on={me.id === issue.creator.id ? "MyIssue" : "Issue"}
              >
                {() => (
                  <Button
                    variant="contained"
                    size="small"
                    disabled={isPending}
                    color={issue.open ? "secondary" : "primary"}
                    onClick={issue.open ? onClickClose : onClickOpen}
                  >
                    {issue.open ? "Close Issue" : "Open Issue"}
                  </Button>
                )}
              </Can>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

function IssueBody(props) {
  const { issue, me } = props;
  const { comments, changes } = issue;
  const [onCreateComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
  });
  const [onDeleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
  });
  const [onUpdateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [{ query: ISSUE_QUERY, variables: { id: issue.id } }]
  });

  function issueBodyNodes() {
    return [
      ...comments
        .concat(changes)
        .sort((a, b) => {
          const ax = new Date(a.createdAt);
          const bx = new Date(b.createdAt);
          // eslint-disable-next-line no-nested-ternary
          return ax > bx ? 1 : ax < bx ? -1 : 0;
        })
        .map((change, index) => {
          if (change.type === undefined) {
            const comment = change;
            return (
              <>
                <IssueComment
                  createdAt={comment.createdAt}
                  first={index === 0}
                  updatedAt={comment.updatedAt}
                  creatorName={comment.creator.name}
                  onCommentUpdated={content => {
                    onUpdateComment({ variables: { id: comment.id, content } });
                  }}
                  onCommentDeleted={() => {
                    onDeleteComment({
                      variables: { id: comment.id },
                      optimisticResponse: {
                        __typename: "Mutation",
                        deleteComment: true
                      }
                    });
                  }}
                  key={comment.id}
                  user={me}
                  creator={comment.creator}
                  content={comment.content}
                />
              </>
            );
          }
          return <IssueHistory key={change.id} change={change} />;
        })
    ];
  }

  return (
    <>
      {issueBodyNodes()}
      {issue.open && (
        <IssueComment
          user={me}
          creator={me}
          onCommentCreated={content => {
            onCreateComment({
              variables: { content, issueId: issue.id }
            });
          }}
        />
      )}
    </>
  );
}

IssueBody.propTypes = {
  issue: PropType.object.isRequired,
  me: PropType.object.isRequired
};
IssueHeader.propTypes = {
  issue: PropType.object.isRequired,
  me: PropType.object.isRequired
};

export default IssuePage;
