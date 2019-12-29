import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import UserAvatar from '../../lib/UserAvatar';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import {useMe} from "../../core/models/users/users.hooks"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    }
}));

export default function(){
    const classes = useStyles();
    const  {me} = useMe();

    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid container justify="center" alignItems="center">
                    <UserAvatar user={me}/>
                </Grid>
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                        <Typography variant="h3">
                            Username : 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {me.name} 
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                        <Typography variant="h3">
                            Email : 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {me.email} 
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                        <Typography component="h3" variant="h3">
                            Role : 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {me.role}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle"/>
                <Grid container direction="column" justify="center" alignItems="center">
                    <BrokenImageIcon className={classes.large}/>
                    <Grid item xs={3}>
                    <Typography variant="body1" align="center">
                        We don't have enough data to show this stage.
                        The staging stage shows statistics about your contributions in fixing bugs in any project.
                    </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}