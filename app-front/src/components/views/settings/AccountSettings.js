import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useMe } from "../../core/models/users/users.hooks";
import { ME_QUERY, UPDATE_USER } from "../../core/models/users/users.graphql";

const useStyles = makeStyles(theme => ({
  whiteCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2%"
  }
}));

function AccountSettings() {
  const { me } = useMe();
  const classes = useStyles();
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [onUpdateUser, { loading: isUpdateUserPending }] = useMutation(
    UPDATE_USER,
    {
      variables: { name, email },
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
        spacing={3}
      >
        <Grid item>
          <Typography variant="h1" component="h1" gutterBottom>
            Account information
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            Account informations settings is about changing the user general
            informations !
          </Typography>
        </Grid>
        <Grid item container spacing={4}>
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            className={classes.whiteCard}
          >
            <Grid item>
              <TextField
                fullWidth
                required
                error={name === ""}
                label="username"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={e => setName(e.target.value)}
                name="username"
                type="text"
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
                // eslint-disable-next-line react/jsx-no-duplicate-props
                error={
                  !email ||
                  !/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email)
                }
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  setName(me.name);
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
                  isUpdateUserPending ||
                  email === "" ||
                  name === "" ||
                  (email === me.email && name === me.name)
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
