import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PropType from "prop-types";
import UserAvatar from "../../lib/UserAvatar";




function IssueComment(props) {
  const { content, user} = props;
  const { onCommentCreated, onCommentDeleted, onCommentUpdated } = props;
  const [value, setValue] = useState(content !== null ? content : "");
  const [edit, setEdit] = useState(false);

  const create = content === null;

  function showHeader() {
    return (
      <Grid item container justify="space-between" spacing={2}>
        <Grid item xs={8}>
          <Typography variant="overline" display="block" gutterBottom>
            {props.user.name} - Commented , Updated props.UpdateAt
          </Typography>
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <Grid item>
            <IconButton aria-label="settings">
              <DeleteIcon  fontSize="small" onClick={onCommentDeleted} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton aria-label="settings" onClick={setEdit} >
              <EditIcon  fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function showContent() {
    return (
      <Grid item>
        <Typography variant="h5" gutterBottom component="p">
          {value}
        </Typography>     
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
    <Box m={2}>
      <Grid container>
        <Grid item xs={1}>
          <UserAvatar user={user} />
        </Grid>
        <Grid item xs={11} container direction="column" spacing={2}>
          <Grid item>
            <Paper>
              {(edit || create) ?
                (
                  editContent()
                ) : (
                  <Grid container direction="column" spacing={2}>
                    {showHeader()}
                    <Divider variant="middle" />
                    {showContent()}
                  </Grid>     
                )
              }
            </Paper>
          </Grid>
          <Grid item container justify="flex-end">
            <Grid item>
              {(edit || create) && (
                <Button
                  disabled={!value}
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
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


IssueComment.defaultProps = {
  content: null
};

IssueComment.propTypes = {
  user: PropType.object.isRequired,
  content: PropType.string,
  onCommentCreated: PropType.func.isRequired,
  onCommentUpdated: PropType.func.isRequired,
  onCommentDeleted: PropType.func.isRequired,
 };

export default IssueComment;