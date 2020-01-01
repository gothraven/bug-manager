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
import { useMe } from "../../core/models/users/users.hooks";
import { ISSUE_QUERY, ISSUE_ADD_TAG, ISSUE_REMOVE_TAG } from "../../core/models/issues/issues.graphql";
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../../core/models/comments/comments.graphql";

import Loading from "../../lib/Loading";

function IssuePage() {
  const { id } = useParams();
  
  const { data, loading } = useQuery(ISSUE_QUERY, { variables: { id } });  
  const [onIssueAddTag] = useMutation(ISSUE_ADD_TAG);
  const [onIssueRemoveTag] = useMutation(ISSUE_REMOVE_TAG);
  
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
            onTagAdded={(tag) => {
              onIssueAddTag({
                variables: { id: issue.id, tagId: tag.id },
                update: (proxy, result) => {
                  const { addTag } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY, variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: { issue: { ...cachedIssue, tags: addTag.tags, changes: addTag.changes } }
                  });
                }
              })
            }}
            onTagRemoved={(tag) => {
              onIssueRemoveTag({
                variables: { id: issue.id, tagId: tag.id },
                update: (proxy, result) => {
                  const { removeTag } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY, variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: { issue: { ...cachedIssue, tags: removeTag.tags, changes: removeTag.changes } }
                  });
                }
              })
            }}
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
  const { me } = useMe();
  const [onCreateComment] = useMutation(CREATE_COMMENT);
  const [onDeleteComment] = useMutation(DELETE_COMMENT);
  const [onUpdateComment] = useMutation(UPDATE_COMMENT);
  
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
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                onCommentUpdated={content => {
                  onUpdateComment({
                    variables: { id: comment.id, content },
                    update: (proxy, result) => {
                      const { updateComment } = result.data;
                      const { issue: cachedIssue } = proxy.readQuery({
                        query: ISSUE_QUERY, variables: { id: issue.id }
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
                          query: ISSUE_QUERY, variables: { id: issue.id }
                        });
                        proxy.writeQuery({
                          query: ISSUE_QUERY,
                          data: {
                            issue: {
                              ...cachedIssue,
                              comments: issue.comments.filter(x => x.id !== comment.id)
                            }
                          }
                        });
                      }
                    }
                  })
                }}
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
      <IssueComment
        creation
        user={me}
        issueId={issue.id}
        onCommentCreated={(content) => {
          onCreateComment({
            variables: { content, issueId: issue.id },
            update: (proxy, result) => {
              const { createComment } = result.data;
              const { issue: cachedIssue } = proxy.readQuery({
                query: ISSUE_QUERY, variables: { id: issue.id }
              });
              proxy.writeQuery({
                query: ISSUE_QUERY,
                data: { issue: { ...cachedIssue, comments: [...issue.comments , createComment] } }
              });
            }
          })
        }}
      />
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


/* 
import { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../../core/models/comments/comments.graphql";


const [onIssueRemoveCommnet] = useMutation(DELETE_COMMENT); 
const [onCreateComment] = useMutation(CREATE_COMMENT);
const [onUpdateComment] = useMutation(UPDATE_COMMENT);

{(comm) => {
                  onCreateComment({
                    variables: {content: comm.content,issueId: issue.id },
                    update: (proxy, result) => {
                      const { addComment } = result.data;
                      const { issue: cachedIssue } = proxy.readQuery({
                        query: ISSUE_QUERY, variables: { id: issue.id }
                      });
                      proxy.writeQuery({
                        query: ISSUE_QUERY,
                        data: {
                          issue: {
                            ...cachedIssue,
                            comments: [ ...issue.comments,addComment ],
                          }
                        }
                      });
                    }
                  })
                }}
={(comm) => {
              onIssueRemoveComment({
                variables: { id: issue.id, commentId: comm.id },
                update: (proxy, result) => {
                  const { removeComment } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY, variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: { issue: { ...cachedIssue, tags: removeComment.comment, changes: removeComment.changes } }
                  });
                }
              })
            }}
issue.comments.map(x => {
  if x.id === updateComment.id
    return updateComment
  return x
})
={(comm) => {
              onUpdateComment({
                variables: { id: issue.id, commentId: comm.id , content: comm.id },
                update: (proxy, result) => {
                  const { updateComment } = result.data;
                  const { issue: cachedIssue } = proxy.readQuery({
                    query: ISSUE_QUERY, variables: { id: issue.id }
                  });
                  proxy.writeQuery({
                    query: ISSUE_QUERY,
                    data: { issue: { ...cachedIssue, comments: updateComment.comments, changes: updateComment.changes } }
                  });
                }
              })
            }}
*/