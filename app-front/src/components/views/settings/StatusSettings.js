import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Loading from "../../lib/Loading";
import SafeCheck from "../../lib/SafeCheck";
import {
  STATUSES_QUERY,
  CREATE_STATUS,
  UPDATE_STATUS,
  DELETE_STATUS
} from "../../core/models/statuses/statuses.graphql";

const useStyles = makeStyles(theme => ({
  listRoot: {
    minWidth: "50vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2%"
  },
  root: {
    margin: "auto"
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 350,
    height: 430,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function StatusSettings() {
  const { data, loading } = useQuery(STATUSES_QUERY);
  const [onStatusCreate, { loading: isStatusCreatePending }] = useMutation(
    CREATE_STATUS
  );
  const [onStatusUpdate, { loading: isStatusUpdatePending }] = useMutation(
    UPDATE_STATUS
  );
  const [onStatusDelete, { loading: isStatusDeletePending }] = useMutation(
    DELETE_STATUS
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={6}
    >
      <Grid item>
        <Typography variant="h1" component="h1" gutterBottom>
          Life Cycle Settings
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Life cyle settings concerns the issues status, you can use the
          examples or create new ones !
        </Typography>
      </Grid>
      <StatusBoard
        statuses={data.statuses}
        isPedning={
          isStatusCreatePending ||
          isStatusUpdatePending ||
          isStatusDeletePending
        }
        onStatusCreate={status => {
          onStatusCreate({
            variables: status,
            update: (proxy, result) => {
              const { createStatus } = result.data;
              const { statuses } = proxy.readQuery({ query: STATUSES_QUERY });
              proxy.writeQuery({
                query: STATUSES_QUERY,
                data: {
                  statuses: [...statuses, createStatus]
                }
              });
            }
          });
        }}
        onStatusUpdate={status => {
          onStatusUpdate({
            variables: status,
            optimisticResponse: {
              __typename: "Mutation",
              updateStatus: {
                __typename: "Status",
                ...status
              }
            },
            update: (proxy, result) => {
              const { updateStatus } = result.data;
              const { statuses } = proxy.readQuery({ query: STATUSES_QUERY });
              proxy.writeQuery({
                query: STATUSES_QUERY,
                data: {
                  statuses: statuses.map(x => {
                    if (x.id === updateStatus.id) {
                      return updateStatus;
                    }
                    return x;
                  })
                }
              });
            }
          });
        }}
        onStatusDelete={id => {
          onStatusDelete({
            variables: { id },
            optimisticResponse: {
              __typename: "Mutation",
              deleteStatus: true
            },
            update: (proxy, result) => {
              const { deleteStatus } = result.data;
              if (deleteStatus) {
                const { statuses } = proxy.readQuery({ query: STATUSES_QUERY });
                proxy.writeQuery({
                  query: STATUSES_QUERY,
                  data: {
                    statuses: statuses.filter(x => x.id !== id)
                  }
                });
              }
            }
          });
        }}
      />
    </Grid>
  );
}

const examples = [
  {
    name: "New Issue",
    description: "New issue that needs to be categorised"
  },
  {
    name: "To Do",
    description: "The issue is in our to do list"
  },
  {
    name: "In Progress",
    description: "The issue is being worked on or something"
  },
  {
    name: "Blocked",
    description: "The issue is blocked"
  },
  {
    name: "Review",
    description: "The issue is being reviewed"
  },
  {
    name: "Testing",
    description: "The issue's solution is being tested"
  }
];

function StatusBoard(props) {
  const classes = useStyles();
  const {
    statuses,
    isPedning,
    onStatusCreate,
    onStatusUpdate,
    onStatusDelete
  } = props;
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(
    examples.filter(x => !statuses.map(y => y.name === x.name).includes(true))
  );
  const [right, setRight] = useState(statuses);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(
      examples.filter(x => !statuses.map(y => y.name === x.name).includes(true))
    );
    setRight(statuses);
  }, [statuses]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    leftChecked.map(value => onStatusCreate(value));
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCreateNewStatus = () => {
    const dummyStatus = {
      name: "name",
      description: "desciption"
    };
    onStatusCreate(dummyStatus);
  };

  const handleDeleteStatus = () => {
    rightChecked.map(value => onStatusDelete(value.id));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleUpdateStatus = status => {
    onStatusUpdate(status);
    setChecked(not(checked, rightChecked));
    setEdit(false);
  };

  const customList = (title, items, isRight) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={<Typography variant="h5">{title}</Typography>}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => (
          <StatusListItem
            key={value}
            status={value}
            onToggle={handleToggle(value)}
            onSave={newValue => handleUpdateStatus(newValue)}
            isChecked={checked.indexOf(value) !== -1}
            edit={edit && isRight}
          />
        ))}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid item container justify="center" alignItems="center" spacing={2}>
      <Grid item>{customList("Examples", left, false)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            className={classes.button}
            onClick={handleCreateNewStatus}
            disabled={isPedning}
            variant="outlined"
            color="primary"
            size="small"
          >
            create
          </Button>
          <Button
            className={classes.button}
            onClick={() => setEdit(true)}
            disabled={isPedning || edit || rightChecked.length !== 1}
            variant="outlined"
            size="small"
          >
            update
          </Button>
          <Button
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={isPedning || leftChecked.length === 0}
            variant="outlined"
            size="small"
          >
            move &gt;
          </Button>
          <SafeCheck
            title="Remove Status(es)"
            content="Are you sure you want to remove this(ese) Status(es) ?"
            action={handleDeleteStatus}
          >
            <Button
              className={classes.button}
              disabled={isPedning || rightChecked.length === 0}
              variant="outlined"
              color="secondary"
              size="small"
            >
              delete
            </Button>
          </SafeCheck>
        </Grid>
      </Grid>
      <Grid item>{customList("Your Issue Life Cycle", right, true)}</Grid>
    </Grid>
  );
}

function StatusListItem(props) {
  const { status, onToggle, onSave, isChecked, edit } = props;
  const [name, setName] = useState(status.name);
  const [description, setDescription] = useState(status.description);

  return (
    <ListItem
      key={status}
      role="listitem"
      button={!(isChecked && edit)}
      onClick={isChecked && edit ? null : onToggle}
    >
      {isChecked && edit ? (
        <Grid>
          <TextField
            error={name === ""}
            margin="dense"
            label="Status Name"
            type="text"
            variant="outlined"
            fullWidth
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Status description"
            type="text"
            variant="outlined"
            fullWidth
            defaultValue={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button
            onClick={() => onSave({ id: status.id, name, description })}
            disabled={
              name === "" ||
              (name === status.name && description === status.description)
            }
            color="primary"
            variant="outlined"
            size="small"
          >
            save
          </Button>
          <Button
            onClick={() => {
              setName(status.name);
              setDescription(status.description);
            }}
            disabled={
              name === status.name && description === status.description
            }
            variant="outlined"
            size="small"
          >
            cancel
          </Button>
        </Grid>
      ) : (
        <>
          <ListItemIcon>
            <Checkbox checked={isChecked} tabIndex={-1} disableRipple />
          </ListItemIcon>
          <ListItemText primary={status.name} secondary={status.description} />
        </>
      )}
    </ListItem>
  );
}

StatusListItem.propTypes = {
  status: propTypes.object.isRequired,
  onToggle: propTypes.func.isRequired,
  onSave: propTypes.func.isRequired,
  isChecked: propTypes.bool.isRequired,
  edit: propTypes.bool.isRequired
};

StatusBoard.propTypes = {
  statuses: propTypes.array.isRequired,
  isPedning: propTypes.bool.isRequired,
  onStatusCreate: propTypes.func.isRequired,
  onStatusUpdate: propTypes.func.isRequired,
  onStatusDelete: propTypes.func.isRequired
};

export default StatusSettings;
