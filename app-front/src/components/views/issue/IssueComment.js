import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropType from "prop-types";
import UserAvatar from "../../lib/UserAvatar";




function IssueComment(props) {
  const { creation, content, user, edit } = props;
  const { onCommentCreated, onCommentDeleted, onCommentUpdated } = props;
  const [value, setValue] = useState(content);
  const [editable, setEditable] = useState(edit); 
  
  return (
    <Box m={2}>
      <Grid container>
        <Grid item xs={1}>
          <UserAvatar user={user} />
        </Grid>
        <Grid item xs>
          {creation ? (
            <>
              <Paper>
                <TextField
                  fullWidth
                  multiline
                  rowsMax="4"
                  label="Comment"
                  placeholder="place a comment"
                  variant="outlined"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </Paper>
              <Box m={1} style={{ display: "grid", justifyItems: "end" }}>
                <Button
                  disabled={!value}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    onCommentCreated(value);
                    setValue("");
                  }}
                >
                  Comment
                </Button>
              </Box>
            </>
          ) : (   
              <>  
                { (!editable) ? (
                  <Card >
                    <CardHeader
                      action={
                        <>
                          <IconButton aria-label="settings">
                            <DeleteIcon onClick={onCommentDeleted} />
                          </IconButton>
                          <IconButton aria-label="settings" onClick={setEditable}>
                            <EditIcon />
                          </IconButton>
                        </>
                      }
                      title="User - Commented CreateAt , UpdateAt " />
                    <Divider variant="middle" />
                    <CardContent>
                      <Typography variant="body1" color="textSecondary" component="p">
                        {value}
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                    <Card >
                    <CardHeader
                      action={
                        <>
                          <IconButton aria-label="settings">
                            <DeleteIcon onClick={onCommentDeleted} />
                          </IconButton>
                          <IconButton aria-label="settings" onClick={setEditable}>
                            <EditIcon />
                          </IconButton>
                        </>
                      }
                      title="User - Commented CreateAt , UpdateAt " />
                    <Divider variant="middle" />
                    <CardContent>
                      <Paper>
                        <TextField
                          fullWidth
                          multiline
                          rowsMax="4"
                          placeholder="place a comment"
                          value={value}
                          onChange={e => setValue(e.target.value)}
                        />
                        </Paper>
                        <Button
                            disabled={!value}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              onCommentUpdated(value);
                              setEditable(!editable);
                            }}
                        >
                        Update
                        </Button>
                    </CardContent>
                  </Card>
                )
                }
                </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}


IssueComment.defaultProps = {
  creation: false,
  content: "",
  edit: false,
};

IssueComment.propTypes = {
  user: PropType.object.isRequired,
  content: PropType.string,
  onCommentCreated: PropType.func.isRequired,
  onCommentUpdated: PropType.func.isRequired,
  onCommentDeleted: PropType.func.isRequired,
  createdAt: PropType.string.isRequired,
  updatedAt: PropType.string.isRequired,
  creation: PropType.bool,
  edit: PropType.bool, 
};

export default IssueComment;


/*
*/