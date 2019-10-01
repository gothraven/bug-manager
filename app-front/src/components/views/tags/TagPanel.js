import React, { useState } from "react";
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

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  chip: {
    margin: theme.spacing(1)
  },
  column: {
    flexBasis: "33.33%"
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function TagPanel(props) {
  const { tag, onDelete, onUpdate } = props;
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(tag.name);
  const [description, setDescription] = useState(tag.description);
  const [color, setColor] = useState(tag.color);
  const classes = useStyles();

  return (
    <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <Chip
          label={name}
          style={{ backgroundColor: color }}
          className={classes.chip}
          variant="outlined"
        />
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>
            {description}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <TextField
          label="name"
          className={classes.textField}
          value={name}
          onChange={event => setName(event.target.value)}
          margin="normal"
        />
        <TextField
          label="description"
          className={classes.secondaryHeading}
          value={description}
          onChange={event => setDescription(event.target.value)}
          margin="normal"
        />
        <TwitterPicker value={color} onChange={event => setColor(event.hex)} />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button color="primary" size="small" onClick={() => onDelete(tag.id)}>
          Delete
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setExpanded(false);
            onUpdate({ id: tag.id, name, description, color });
          }}
        >
          Save
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

TagPanel.propTypes = {
  tag: PropType.object.isRequired,
  onUpdate: PropType.func.isRequired,
  onDelete: PropType.func.isRequired
};

export default TagPanel;
