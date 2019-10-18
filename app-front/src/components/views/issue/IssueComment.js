import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropType from "prop-types";

function IssueComment(props) {
  const { creation, issue } = props;
  const [value, setValue] = useState("");

  return (
    <Box m={2}>
      <Grid container>
        <Grid item xs={1}>
          <Avatar>AM</Avatar>
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
                <Button disabled={!value} color="primary" variant="contained">
                  Comment
                </Button>
              </Box>
            </>
          ) : (
            <Paper>{issue.content}</Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

IssueComment.defaultProps = { creation: false };

IssueComment.propTypes = {
  issue: PropType.object.isRequired,
  creation: PropType.bool
};

export default IssueComment;
