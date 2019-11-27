import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropType from "prop-types";
import UserAvatar from "../../lib/UserAvatar";

function IssueComment(props) {
  const { creation, content, user } = props;
  // const [edit, setEdit] = useState(creation);
  const [value, setValue] = useState(content);

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
                <Button disabled={!value} color="primary" variant="contained">
                  Comment
                </Button>
              </Box>
            </>
          ) : (
              <Paper style={{ padding: 10 }}>{value}</Paper>
            )}
        </Grid>
      </Grid>
    </Box>
  );
}

IssueComment.defaultProps = {
  creation: false,
  content: ""
};

IssueComment.propTypes = {
  user: PropType.object.isRequired,
  content: PropType.string,
  creation: PropType.bool
};

export default IssueComment;
