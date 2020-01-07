import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import Fab from "@material-ui/core/Fab";
import Input from "@material-ui/core/Input";
import RadioGroup from "@material-ui/core/RadioGroup";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Loading from "../../lib/Loading";
import UserAvatar from "../../lib/UserAvatar";
import {
  USERS_QUERY,
  UPDATE_USER_ROLE
} from "../../core/models/users/users.graphql";
import { ADMIN, DEVELOPER, USER } from "../../core/constants";

const useStyles = makeStyles(theme => ({
  listRoot: {
    minWidth: "50vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2%"
  }
}));

function UsersSettings() {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const [validatedSearchInput, setValidatedSearchInput] = useState("");
  const [onUpdateUserRole, { loading: isUpdateUserRolePending }] = useMutation(
    UPDATE_USER_ROLE
  );
  const { data, loading, fetchMore } = useQuery(USERS_QUERY, {
    variables: {
      cursor: "",
      filters: { email: validatedSearchInput }
    },
    fetchPolicy: "cache-and-network"
  });

  const loadMore = useCallback(() => {
    const { endCursor, hasNextPage } = data.users.pageInfo;

    if (loading || !hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        cursor: endCursor,
        filters: { email: validatedSearchInput }
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.users.edges;
        const { pageInfo } = fetchMoreResult.users;

        return newEdges.length
          ? {
              users: {
                __typename: previousResult.users.__typename,
                edges: [...previousResult.users.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  }, [data, loading, fetchMore, validatedSearchInput]);

  if (loading) {
    return <Loading />;
  }

  const { hasNextPage } = data.users.pageInfo;

  return (
    <form>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Users Settings
        </Typography>
        <Grid item container direction="column" justify="center" spacing={2}>
          <Grid item container justify="flex-end">
            <Grid item xs={5} container alignItems="center" spacing={2}>
              <Input
                onChange={e => setSearchInput(e.target.value)}
                value={searchInput}
                onKeyUp={e => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    setValidatedSearchInput(searchInput);
                  }
                }}
                autoFocus
                placeholder="Search for a user ..."
                style={{ marginLeft: 20, flex: 1 }}
              />
              <Grid item xs={2}>
                <Fab
                  size="small"
                  color="primary"
                  onClick={() => setValidatedSearchInput(searchInput)}
                >
                  <SearchIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <List className={classes.listRoot}>
              {data.users.edges.map(node => {
                if (node === null) {
                  return null;
                }
                return (
                  <UserListItem
                    key={node.id}
                    user={node}
                    disabeled={isUpdateUserRolePending}
                    onUpdateRole={role =>
                      onUpdateUserRole({
                        variables: { id: node.id, role },
                        optimisticResponse: {
                          __typename: "Mutation",
                          updateUserRole: {
                            __typename: "User",
                            ...node,
                            role
                          }
                        },
                        update: (proxy, result) => {
                          const { updateUserRole } = result.data;
                          const { users } = proxy.readQuery({
                            query: UPDATE_USER_ROLE
                          });
                          proxy.writeQuery({
                            query: UPDATE_USER_ROLE,
                            data: {
                              users: {
                                ...users,
                                edges: users.edges.map(edge =>
                                  edge.id === node.id ? updateUserRole : edge
                                )
                              }
                            }
                          });
                        }
                      })
                    }
                  />
                );
              })}
            </List>
            {hasNextPage && (
              <Grid container justify="center">
                <Grid item>
                  <Button onClick={loadMore}>load more</Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

function UserListItem(props) {
  const { user, disabeled, onUpdateRole } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar user={user} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="div" variant="h5" color="textPrimary">
            {user.name}
          </Typography>
        }
        secondary={
          <Typography component="div" variant="subtitle" color="textPrimary">
            {user.email}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <RadioGroup
          disabeled={disabeled}
          row
          value={user.role}
          onChange={e => onUpdateRole(e.target.value)}
        >
          <FormControlLabel
            value={USER}
            control={<Radio color="warning" />}
            label="User"
            labelPlacement="top"
          />
          <FormControlLabel
            value={DEVELOPER}
            control={<Radio color="primary" />}
            label="Developer"
            labelPlacement="top"
          />
          <FormControlLabel
            value={ADMIN}
            control={<Radio color="secondary" />}
            label="Admin"
            labelPlacement="top"
          />
        </RadioGroup>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

UserListItem.propTypes = {
  user: propTypes.object.isRequired,
  onUpdateRole: propTypes.func.isRequired,
  disabeled: propTypes.bool.isRequired
};

export default UsersSettings;
