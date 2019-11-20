import React, { useState, useEffect } from "react";
import PropType from "prop-types";
import { TwitterPicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { invertColor } from "../../core/utils/Functions";
import { useUpdateTag, useDeleteTag } from "./mutations/TagMutations";

const useStyles = makeStyles(theme => ({
  description: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

function TagPanel(props) {
  const { disabled, tag } = props;
  const [expanded, setExpanded] = useState(tag.id === undefined);
  const [name, setName] = useState(tag.name);
  const [description, setDescription] = useState(tag.description || "");
  const [color, setColor] = useState(tag.color);
  const [isTagUpdatePending, onUpdateTag] = useUpdateTag(
    tag.id,
    name,
    description,
    color
  );
  const [isTagDeletePending, onDeleteTag] = useDeleteTag(tag.id);
  const classes = useStyles();
  const isPending = isTagUpdatePending || isTagDeletePending;

  useEffect(() => {
    setName(tag.name);
    setDescription(tag.description || "");
    setColor(tag.color);
  }, [tag]);

  return (
    <ExpansionPanel expanded={!disabled && expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary expandIcon={!disabled && <ExpandMoreIcon />}>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={2}>
            <Chip
              label={name}
              style={{
                borderColor: color,
                backgroundColor: color,
                color: invertColor(color)
              }}
              variant="outlined"
            />
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
        <Button
          color="primary"
          size="small"
          onClick={onDeleteTag}
          disabled={isPending}
        >
          Delete
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={isPending}
          onClick={() => {
            setExpanded(false);
            onUpdateTag();
          }}
        >
          Save
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

TagPanel.defaultProps = {
  disabled: false,
}

TagPanel.propTypes = {
  tag: PropType.object.isRequired,
  disabled: PropType.bool,
};

export default TagPanel;
