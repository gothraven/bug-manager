import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import propTypes from "prop-types";
import { TwitterPicker } from "react-color";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TagChip from "../../lib/TagChip";
import SafeCheck from "../../lib/SafeCheck";
import {
  DELETE_TAG,
  TAGS_QUERY,
  UPDATE_TAG
} from "../../core/models/tags/tags.graphql";

import useStyles from "./TagPanel.scss";

function TagPanel(props) {
  const classes = useStyles();
  const { disabled, tag } = props;
  const [expanded, setExpanded] = useState(tag.id === undefined);
  const [name, setName] = useState(tag.name);
  const [description, setDescription] = useState(tag.description || "");
  const [color, setColor] = useState(tag.color);
  const [onTagUpdate, { loading: isTagUpdatePending }] = useMutation(
    UPDATE_TAG,
    {
      variables: { id: tag.id, name, description, color },
      optimisticResponse: {
        __typename: "Mutation",
        updateTag: {
          __typename: "Tag",
          id: tag.id,
          name,
          description,
          color
        }
      },
      update: (proxy, result) => {
        const { updateTag } = result.data;
        const { tags } = proxy.readQuery({ query: TAGS_QUERY });
        proxy.writeQuery({
          query: TAGS_QUERY,
          data: {
            tags: {
              ...tags,
              edges: tags.edges.map(edge =>
                edge.id === tag.id ? updateTag : edge
              )
            }
          }
        });
      }
    }
  );
  const [onDeleteTag, { loading: isTagDeletePending }] = useMutation(
    DELETE_TAG,
    {
      variables: { id: tag.id },
      optimisticResponse: {
        __typename: "Mutation",
        deleteTag: true
      },
      update: (proxy, result) => {
        const { deleteTag } = result.data;
        if (deleteTag) {
          const { tags } = proxy.readQuery({ query: TAGS_QUERY });
          proxy.writeQuery({
            query: TAGS_QUERY,
            data: {
              tags: {
                ...tags,
                edges: tags.edges.filter(edge => edge.id !== tag.id)
              }
            }
          });
        }
      }
    }
  );

  const isPending = isTagUpdatePending || isTagDeletePending;

  useEffect(() => {
    setName(tag.name);
    setDescription(tag.description || "");
    setColor(tag.color);
  }, [tag]);

  return (
    <ExpansionPanel
      expanded={!disabled && expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <ExpansionPanelSummary expandIcon={!disabled && <ExpandMoreIcon />}>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={2}>
            <TagChip tag={{ ...tag, name, color }} />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.description}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify="flex-start" alignItems="stretch" spacing={2}>
          <Grid item>
            <TwitterPicker value={color} onChange={e => setColor(e.hex)} />
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <TextField
                label="name"
                placeholder="Urgent"
                value={name}
                fullWidth
                variant="outlined"
                onChange={e => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="description"
                value={description}
                placeholder="This concerns all the issues that we should fix urgently"
                onChange={e => setDescription(e.target.value)}
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <SafeCheck
          key={1}
          title='Delete Tag'
          content='Are you sure you want to delete this Tag ?'
          action={onDeleteTag}
        >
          <Button color="secondary" size="small" disabled={isPending}>
            Delete
          </Button>
        </SafeCheck>
        <Button
          size="small"
          color="primary"
          disabled={isPending}
          onClick={() => {
            setExpanded(false);
            onTagUpdate();
          }}
        >
          Save
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

TagPanel.defaultProps = {
  disabled: false
};

TagPanel.propTypes = {
  tag: propTypes.object.isRequired,
  disabled: propTypes.bool
};

export default TagPanel;
