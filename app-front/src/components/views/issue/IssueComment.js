import React, { useState } from "react";
import PropType from "prop-types";
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import UserAvatar from "../../lib/UserAvatar";
import { Can } from "../../core/Ability";

import useStyles from "./IssueComment.scss";

function IssueComment(props) {
  const classes = useStyles();
  const { content, creator, user } = props;
  const { createdAt, updatedAt, onCommentCreated, onCommentDeleted, onCommentUpdated } = props;
  const [value, setValue] = useState(content !== null ? content : "");
  const [edit, setEdit] = useState(false);
  const create = content === null;

  function showHeader() {
    return (
      <Grid item container justify="space-between" alignItems="center" spacing={1}>
        <Grid item xs>
          <Typography variant="caption">{`Created ${moment(createdAt).fromNow()}`}</Typography>
          {
            createdAt !== updatedAt &&
            <Typography variant="caption">{`, Updated ${moment(updatedAt).fromNow()}`}</Typography>
          }
        </Grid>
        <Grid item xs={3} container justify="flex-end" alignItems="center" spacing={1}>
          <Grid item>
            <Chip size="small" label={creator.role} variant="outlined" />
          </Grid>
          <Grid item>
            <Can do="delete" on={user.id === creator.id ? "MyComment" : "Comment"}>
              <IconButton
                size="small"
                onClick={onCommentDeleted}
              >
                <DeleteIcon />
              </IconButton>
            </Can>
            <Can do="edit" on={user.id === creator.id ? "MyComment" : "Comment"}>
              <IconButton
                size="small"
                onClick={() => setEdit(!edit)}
              >
                <EditIcon />
              </IconButton>
            </Can>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function editContent() {
    return (
      <TextField
        fullWidth
        multiline
        variant="outlined"
        rowsMax="15"
        rows="6"
        placeholder="place a comment"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  }

  return (
    <Grid item container spacing={2}>
      <Grid item xs={1} container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <UserAvatar user={creator} />
        </Grid>
        <Grid item>
          <Typography textAlign='center' variant="caption" gutterBottom>{creator.name}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={11} container direction="column" spacing={1}>
        <Grid item className={classes.paper}>
          {(edit || create) ?
            (
              editContent()
            ) : (
              <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={2}>
                {showHeader()}
                <Divider variant="middle" />
                <Grid item>
                  <Typography className={classes.content} gutterBottom>{value}</Typography>
                </Grid>
              </Grid>
            )
          }
        </Grid>
        {(edit || create) && (
          <Grid item container justify="flex-end" spacing={2} style={{ marginTop: 3, marginBottom: 3 }}>
            {edit &&
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    setValue(content);
                    setEdit(!edit);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            }
            <Grid item>
              <Button
                disabled={!value || value === content}
                color="primary"
                variant="contained"
                onClick={() => {
                  if (create) {
                    onCommentCreated(value);
                    setValue("");
                  } else {
                    onCommentUpdated(value);
                    setEdit(!edit);
                  }
                }}
              >
                {edit ? "Update" : "Comment"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}


IssueComment.defaultProps = {
  content: null,
  createdAt: null,
  updatedAt: null,
  onCommentCreated: () => { },
  onCommentUpdated: () => { },
  onCommentDeleted: () => { }
};

IssueComment.propTypes = {
  user: PropType.object.isRequired,
  creator: PropType.object.isRequired,
  createdAt: PropType.string,
  updatedAt: PropType.string,
  content: PropType.string,
  onCommentCreated: PropType.func,
  onCommentUpdated: PropType.func,
  onCommentDeleted: PropType.func,
};

export default IssueComment;