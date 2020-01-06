import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_PASSWORD } from '../../core/models/users/users.graphql'

function SecuritySettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onUserPasswordUpdate] = useMutation(UPDATE_USER_PASSWORD, {
    variables: { oldPassword, newPassword, confirmPassword },
  });
  const checkAndSetPassword = () => newPassword === confirmPassword && regex(newPassword) ? onUserPasswordUpdate() : false;
  const regex_characters = /^[a-zA-Z0-9-_()$&*!@#]{8,}$/;
  const regex_upper_case = /^.*[A-Z].*[A-Z].*$/;
  const regex_lower_case = /^.*[a-z].*[a-z].*[a-z].*[a-z].*$/;
  const regex_number = /^.*[0-9].*[0-9].*$/;
  const regex = str => regex_characters.test(str) && regex_upper_case.test(str) && regex_number.test(str) && regex_lower_case.test(str);

  return (
    <form>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Security information
        </Typography>
        <Grid item container spacing={4}>
          <Grid item container direction="column" justify="flex-start">
            <Grid item>
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                name="oldPassword"
                label="old password"
                type="password"
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                name="newPassword"
                label="new password"
                type="password"
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                label="confirm password"
                type="password"
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Undo
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  checkAndSetPassword();
                }}
                disabled={oldPassword.length < 8}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default SecuritySettings;