import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import PropType from "prop-types";
import Menu from '@material-ui/core/Menu';
import DoneIcon from '@material-ui/icons/Done';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserAvatar from "../../lib/UserAvatar";

function IssueComment(props) {
  const { content, user} = props;
  const { onCommentCreated, onCommentDeleted, onCommentUpdated } = props;
  const [value, setValue] = useState(content !== null ? content : "");
  const [edit, setEdit] = useState(false);  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const create = content === null;

  const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  }));
  const classes = useStyles();
  
  const handleClose = () => { 
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClose = () => {
    setAnchorEl(null);
    setEdit(!edit); 
    };
  const handleDeltedClose = () => {
    onCommentDeleted();
    setAnchorEl(null);
    };

  function showListOfAction() {
    return (
      <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 24 * 4.5,
            width: 200,
          },
        }}
      >
          <MenuItem onClick={handleEditClose}>
            Edit
          </MenuItem>
          <MenuItem  onClick={handleDeltedClose}>
            Delete
          </MenuItem>
        
      </Menu>
    </div>
    );
  }

  function showHeader() {
    return (
      <Grid item container justify="space-between" spacing={2}>
        <Grid item xs={8}>
            <Grid container justify="center" alignItems="center">
            <Chip
              label="Nadir"
                avatar={<Avatar>BM</Avatar>}
                color="primary"
                variant="outlined"
              />
             <Chip
                label="Commented 3 Days ago"
                color="primary"
                deleteIcon={<DoneIcon />}
                variant="outlined"
            />
            <Chip label="Last Updated 2 Hours ago" /> 
          </Grid>
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          {showListOfAction()}
        </Grid>
      </Grid>
    );
  }

  function showContent() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={1}/>
        <Grid item xs={9}>
          <div className={classes.root}>{value}</div>
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
  createdAt: PropType.object.isRequired,
  updatedAt: PropType.object.isRequired,
 };

export default IssueComment;