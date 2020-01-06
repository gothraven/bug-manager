import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  CREATE_ISSUE,
  ISSUES_QUERY,
  ISSUES_STATISTICS_QUERY
} from "../core/models/issues/issues.graphql";

function NewIssueView() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  const [onCreateIssue, { loading: isIssueCreatePending }] = useMutation(
    CREATE_ISSUE,
    {
      variables: { title, content },
      refetchQueries: [{ query: ISSUES_QUERY }, { query: ISSUES_STATISTICS_QUERY }],
      update: (proxy, result) => {
        const { createIssue } = result.data;
        setTitle("");
        setContent("");
        history.push(`/user/issue/${createIssue.id}`);
      }
    }
  );

  return (
    <>
      <Fab
        aria-label="add-issue"
        style={{ backgroundColor: "#fff" }}
        onClick={() => setOpen(true)}
      >
        <img
          style={{ width: 30, margin: 5 }}
          src="/images/create_32dp.png"
          alt="Under development"
        />
      </Fab>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Typography component="span" variant="h1">
            New Issue
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" direction="column">
            <TextField
              name="title"
              label="Title"
              margin="normal"
              variant="outlined"
              placeholder="The issue title"
              fullWidth
              required
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              name="content"
              label="Content"
              margin="normal"
              variant="outlined"
              fullWidth
              placeholder="Describe your issue here"
              rowsMax="15"
              rows="6"
              required
              multiline
              onChange={e => setContent(e.target.value)}
              value={content}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            disabled={isIssueCreatePending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isIssueCreatePending}
            color="primary"
            onClick={() => {
              onCreateIssue();
              setOpen(false);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewIssueView;
