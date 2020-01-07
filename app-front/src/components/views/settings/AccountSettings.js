import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useMe } from "../../core/models/users/users.hooks";
import { ME_QUERY, UPDATE_USER } from "../../core/models/users/users.graphql";

function AccountSettings() {
  const { me } = useMe();
  const [username, setUsername] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [onUpdateUser, { loading: isUpdateUserPending }] = useMutation(
    UPDATE_USER,
    {
      variables: { name: username, email },
      update: (proxy, { data }) => {
        const user = data.updateUser;
        proxy.writeQuery({
          query: ME_QUERY,
          data: { me: user }
        });
      }
    }
  );

  return (
    <form>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Account information
        </Typography>
        <Grid item container spacing={4}>
          <Grid item container direction="column" justify="flex-start">
            <Grid item>
              <TextField
                fullWidth
                required
                error={username === ""}
                label="username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={e => setUsername(e.target.value)}
                name="username"
                type="text"
                error={!username}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                error={email === ""}
                label="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                error={!email || !/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email)}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  setUsername(me.name);
                  setEmail(me.email);
                }}
              >
                Undo
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                type="submit"
                disabled={
                  isUpdateUserPending || email === "" || username === ""
                }
                onClick={e => {
                  e.preventDefault();
                  onUpdateUser();
                }}
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

export default AccountSettings;
