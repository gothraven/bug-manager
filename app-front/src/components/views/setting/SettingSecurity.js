import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_PASSWORD } from '../../core/models/users/users.graphql'

export default function(){
    const [oldPassword, setOldPassword] =  useState("");
    const [newPassword, setNewPassword] =  useState("");
    const [confirmPassword, setConfirmPassword] =  useState("");

    const [onUserPasswordUpdate] = useMutation(UPDATE_USER_PASSWORD, {
            variables: { oldPassword, newPassword, confirmPassword },
        }
    );

    const checkNSetPassword = () => newPassword === confirmPassword ? onUserPasswordUpdate() : false;

    return (
        <Grid 
            container
            direction="column"
        >
            <Grid item>
                <Typography component="h1" variant="h1">
                    Security information 
                </Typography>
            </Grid>
            <Grid item>
                <form>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} >
                        <Grid item>
                            <Typography component="h5" variant="h5">
                                old password : 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                                name="oldPassword"
                                label="old password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} >
                        <Grid item>
                            <Typography component="h5" variant="h5">
                                new password : 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                name="newPassword"
                                label="new password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} >
                        <Grid item>
                            <Typography component="h5" variant="h5">
                                confirm password : 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                                label="confirm password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                        <Grid item>
                            <Button color="secondary" type="button" onClick={e => {setOldPassword(""); setNewPassword(""); setConfirmPassword("")}}>
                                Undo
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" type="submit" onClick={e => {e.preventDefault(); checkNSetPassword()}}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}