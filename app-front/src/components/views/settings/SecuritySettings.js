import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_PASSWORD } from "../../core/models/users/users.graphql";

const tooltipPassword = (
  <p style={{ fontSize: "12px" }}>
    Le champs doit comporter au minimun :<br />
    - 2 Majuscules
    <br />
    - 4 Minuscules
    <br />
    - 2 Chiffres
    <br />
    Le mot de passe et la confirmation du mot de passe doivent être identique
  </p>
);

function SecuritySettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onUserPasswordUpdate] = useMutation(UPDATE_USER_PASSWORD, {
    variables: { oldPassword, newPassword }
  });

  const onUndoHandler = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const checkAndSetPassword = () =>
    newPassword === confirmPassword && regex(newPassword)
      ? () => {
          onUserPasswordUpdate();
          onUndoHandler("");
        }
      : () => {};

  const regexCharacters = /^[a-zA-Z0-9-_()$&*!@#]{8,}$/;
  const regexUpperCase = /^.*[A-Z].*[A-Z].*$/;
  const regexLowerCase = /^.*[a-z].*[a-z].*[a-z].*[a-z].*$/;
  const regexNumber = /^.*[0-9].*[0-9].*$/;
  const regex = str =>
    regexCharacters.test(str) &&
    regexUpperCase.test(str) &&
    regexNumber.test(str) &&
    regexLowerCase.test(str);

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
                error={!oldPassword}
              />
              <Tooltip title={tooltipPassword} placement="bottom-end">
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
                  error={
                    (!!newPassword && !regex(newPassword)) ||
                    confirmPassword !== newPassword
                  }
                />
              </Tooltip>
              <Tooltip title={tooltipPassword} placement="bottom-end">
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
                  error={
                    (!!confirmPassword && !regex(confirmPassword)) ||
                    confirmPassword !== newPassword
                  }
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button color="secondary" type="button" onClick={onUndoHandler}>
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
                disabled={
                  !oldPassword ||
                  !regex(confirmPassword) ||
                  !regex(newPassword) ||
                  newPassword !== confirmPassword
                }
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
