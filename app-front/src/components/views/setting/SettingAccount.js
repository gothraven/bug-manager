import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {useMe} from "../../core/models/users/users.hooks"
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ME_QUERY } from "../../core/models/users/users.graphql";

const SET_INFO_USER =  gql`
mutation UpdateUserMutation($name: String!, $email: EmailAddress!) {
  updateUser( name: $name, email: $email ) {
    id
    name
    email
    role
  }
}
`;

export default function(){
    const {me} = useMe();
    const [username, setUsername] =  useState(me.name);
    const [email, setEmail] =  useState(me.email);

    const [setInfoUser] = useMutation(SET_INFO_USER, {
        variables: { name : username, email },
        update: (proxy, { data }) => {
            const { user } = data.updateUser;
            proxy.writeQuery({
                query: ME_QUERY,
                data: { me: user }
            });
        }
    });

    return <Grid 
        container
        direction="column"
    >
        <Grid item>
            <Typography component="h1" variant="h1">
                Account information 
            </Typography>
        </Grid>
        <Grid item>
            <form>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} >
                    <Grid item>
                        <Typography component="h5" variant="h5">
                            username : 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            name="username"
                            type="text"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} >
                    <Grid item>
                        <Typography component="h5" variant="h5">
                            email : 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            type="email"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                    <Grid item>
                        <Button color="secondary" type="button" onClick={e => {setUsername(me.name); setEmail(me.email)}}>
                            Undo
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" type="submit" onClick={e => {e.preventDefault(); setInfoUser()}}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </Grid>
}