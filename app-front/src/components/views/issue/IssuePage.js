import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import IssueComment from "./IssueComment";
import IssueHistory from "./IssueHistory";
import IssueTags from "./IssueTags";
import IssueAssignees from "./IssueAssignees";
import Loading from "../../lib/Loading";
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
  ISSUE_REOPEN
} from "../../core/models/issues/issues.graphql";

function IssuePage() {
  const { id } = useParams();
  const { data, loading } = useQuery(ISSUE_QUERY, { variables: { id } });
  const [onIssueAddTag] = useMutation(ISSUE_ADD_TAG);
  const [onIssueRemoveTag] = useMutation(ISSUE_REMOVE_TAG);
  const [onIssueAssignUser] = useMutation(ISSUE_ASSIGNE_USER);
  const [onIssueUnassignUser] = useMutation(ISSUE_UNASSIGN_USER);

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
      <Grid item>
        <IssueHeader issue={issue} />
        <Divider />
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
          <IssueBody issue={issue} />
        </Grid>
        <Grid item xs={3}>
          <IssueAssignees
            assignedUsers={issue.assignedUsers}
            onAssignUser={assigne => {
              onIssueAssignUser({
                variables: { id: issue.id, userId: assigne.id },
                update: (proxy, result) => {
                  const { assignUser } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY,
                    variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: {
                      issue: {
                        ...cachedIssue,
                        assignedUsers: assignUser.assignedUsers,
                        changes: assignUser.changes
                      }
                    }
                  });
                }
              });
            }}
            onUnassignUser={assigne => {
              onIssueUnassignUser({
                variables: { id: issue.id, userId: assigne.id },
                update: (proxy, result) => {
                  const { unassignUser } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY,
                    variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: {
                      issue: {
                        ...cachedIssue,
                        assignedUsers: unassignUser.assignedUsers,
                        changes: unassignUser.changes
                      }
                    }
                  });
                }
              });
            }}
          />
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
        </Grid>
      </Grid>
    </Grid>
  );
}

function IssueHeader(props) {
  const { issue } = props;
  const [editTitle, setEditTitle] = useState(false);
  const [titleIssue, setTitleIssue] = useState(issue.title);
  const [onIssueUpdateTitle] = useMutation(ISSUE_UPDATE);
  const [onIssueClose] = useMutation(ISSUE_CLOSE);
  const [onIssueReOpen] = useMutation(ISSUE_REOPEN);

  return (
    <Grid item xs={12}>
      {editTitle ? (
        <Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              rowsMax="15"
              rows="1"
              value={titleIssue}
              onChange={e => setTitleIssue(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => {
                onIssueUpdateTitle({
                  variables: { id: issue.id, title: titleIssue },
                  update: (proxy, result) => {
                    const { updateIssue } = result.data;
                    const { issue: cachedIssue } = proxy.readQuery({
                      query: ISSUE_QUERY,
                      variables: { id: issue.id }
                    });
                    proxy.writeQuery({
                      query: ISSUE_QUERY,
                      data: {
                        issue: {
                          ...cachedIssue,
                          titleIssue: updateIssue.title,
                          changes: updateIssue.changes
                        }
                      }
                    });
                  }
                });
                setEditTitle(!editTitle);
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid item xs={6}>
            <Typography variant="h1" component="h1" gutterBottom>
              # {issue.title}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton size="small" onClick={() => setEditTitle(!editTitle)}>
              <EditIcon />
            </IconButton>
            {issue.open ? (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  onIssueClose({
                    variables: { id: issue.id },
                    update: (proxy, result) => {
                      const { closeIssue } = result.data;
                      const { issue: cachedIssue } = proxy.readQuery({
                        query: ISSUE_QUERY,
                        variables: { id: issue.id }
                      });
                      proxy.writeQuery({
                        query: ISSUE_QUERY,
                        data: {
                          issue: {
                            ...cachedIssue,
                            changes: closeIssue.changes
                          }
                        }
                      });
                    }
                  });
                }}
              >
                Close Issue
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  onIssueReOpen({
                    variables: { id: issue.id },
                    update: (proxy, result) => {
                      const { reopenIssue } = result.data;
                      const { issue: cachedIssue } = proxy.readQuery({
                        query: ISSUE_QUERY,
                        variables: { id: issue.id }
                      });
                      proxy.writeQuery({
                        query: ISSUE_QUERY,
                        data: {
                          issue: {
                            ...cachedIssue,
                            changes: reopenIssue.changes
                          }
                        }
                      });
                    }
                  });
                }}
              >
                Reopen Issue
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function IssueBody(props) {
  const { issue } = props;
  const { comments, changes } = issue;
  const { me } = useMe();
  const [onCreateComment] = useMutation(CREATE_COMMENT);
  const [onDeleteComment] = useMutation(DELETE_COMMENT);
  const [onUpdateComment] = useMutation(UPDATE_COMMENT);

  function issueBodyNodes() {
    return [
      ...comments
        .concat(changes)
        .sort((a, b) => parseInt(a.createdAt, 10) - parseInt(b.createdAt, 10))
        .map(change => {
          if (change.type === undefined) {
            const comment = change;
            return (
              <IssueComment
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                creatorName={comment.creator.name}
                onCommentUpdated={content => {
                  onUpdateComment({
                    variables: { id: comment.id, content },
                    update: (proxy, result) => {
                      const { updateComment } = result.data;
                      const { issue: cachedIssue } = proxy.readQuery({
                        query: ISSUE_QUERY,
                        variables: { id: issue.id }
                      });
                      proxy.writeQuery({
                        query: ISSUE_QUERY,
                        data: {
                          issue: {
                            ...cachedIssue,
                            comments: issue.comments.map(x => {
                              if (x.id === updateComment.id)
                                return updateComment;
                              return x;
                            })
                          }
                        }
                      });
                    }
                  });
                }}
                onCommentDeleted={() => {
                  onDeleteComment({
                    variables: { id: comment.id },
                    optimisticResponse: {
                      __typename: "Mutation",
                      deleteComment: true
                    },
                    update: (proxy, result) => {
                      const { deleteComment } = result.data;
                      if (deleteComment) {
                        const { issue: cachedIssue } = proxy.readQuery({
                          query: ISSUE_QUERY,
                          variables: { id: issue.id }
                        });
                        proxy.writeQuery({
                          query: ISSUE_QUERY,
                          data: {
                            issue: {
                              ...cachedIssue,
                              comments: issue.comments.filter(
                                x => x.id !== comment.id
                              )
                            }
                          }
                        });
                      }
                    }
                  });
                }}
                key={comment.id}
                user={me}
                creator={comment.creator}
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
      <IssueComment
        user={me}
        creator={me}
        onCommentCreated={content => {
          onCreateComment({
            variables: { content, issueId: issue.id },
            update: (proxy, result) => {
              const { createComment } = result.data;
              const { issue: cachedIssue } = proxy.readQuery({
                query: ISSUE_QUERY,
                variables: { id: issue.id }
              });
              proxy.writeQuery({
                query: ISSUE_QUERY,
                data: {
                  issue: {
                    ...cachedIssue,
                    comments: [...issue.comments, createComment]
                  }
                }
              });
            }
          });
        }}
      />
    </>
  );
}

IssueBody.propTypes = {
  issue: PropType.object.isRequired
};
IssueHeader.propTypes = {
  issue: PropType.object.isRequired
};

export default IssuePage;
