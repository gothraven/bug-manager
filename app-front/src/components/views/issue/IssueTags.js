import React, { useState } from "react";
import propType from "prop-types";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { TAGS_QUERY } from "../../core/models/tags/tags.graphql";
import { usePagination } from "../../core/hooks";
import TagChip from "../../lib/TagChip";
import { Can } from "../../core/Ability";
import AutoCompletePopper from "../../lib/AutoCompletePopper";

import useStyles from "./IssueTags.scss";

function IssueTags(props) {
  const classes = useStyles();
  const { onTagAdded, onTagRemoved } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [tags, setTags] = useState(props.tags);
  const [pendingTags, setPendingTags] = useState(props.tags);
  const { data, loading: loadingTags, fetchMore } = usePagination(
    TAGS_QUERY,
    "tags",
    { notifyOnNetworkStatusChange: true }
  );

  function handleRemovedTags() {
    tags
      .filter(tag => !pendingTags.includes(tag))
      .map(tag => onTagRemoved(tag));
  }

  function handleAddedTags() {
    pendingTags.filter(tag => !tags.includes(tag)).map(tag => onTagAdded(tag));
  }

  const handleClick = event => {
    setPendingTags(tags);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleRemovedTags();
    handleAddedTags();
    setTags(pendingTags);

    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  let hasMore = false;

  if (data && data.tags && data.tags.pageInfo) {
    const { hasNextPage } = data.tags.pageInfo;
    hasMore = hasNextPage;
  }

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justify="space-between" alignContent="center">
            <Typography
              variant="h3"
              style={{ textTransform: "uppercase", color: "#2E231C" }}
            >
              Tags
            </Typography>
            <Can I="use" this="AssignTags">
              {() => (
                <IconButton
                  component="span"
                  style={{ padding: 0 }}
                  onClick={handleClick}
                >
                  <SettingsIcon />
                </IconButton>
              )}
            </Can>
          </Grid>
          <Divider />
          <Grid item container spacing={1}>
            {tags.map((tag, index) => (
              <Grid
                item
                key={tag.id || index}
                container
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <TagChip tag={tag} style={{ marginTop: 5 }} />
                </Grid>
              </Grid>
            ))}
            {tags.length === 0 && (
              <Grid item>
                <Typography>None yet</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <AutoCompletePopper
          open={open}
          anchorEl={anchorEl}
          title="Apply labels"
          loading={loadingTags}
          onClose={handleClose}
          multiple
          pendingValues={pendingTags}
          allValues={
            loadingTags ? [] : _.uniqBy([...tags, ...data.tags.edges], "id")
          }
          selectedValues={tags}
          onChange={(event, newValue) => setPendingTags(newValue)}
          hasMore={hasMore}
          fetchMore={fetchMore}
          noOptionsText="No labels"
          renderOption={(option, { selected }) => (
            <>
              <DoneIcon
                className={classes.iconSelected}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
              <span
                className={classes.color}
                style={{ backgroundColor: option.color }}
              />
              <div className={classes.text}>
                {option.name}
                <br />
                {option.description}
              </div>
              <CloseIcon
                className={classes.close}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
            </>
          )}
        />
      </Paper>
    </Box>
  );
}

IssueTags.propTypes = {
  tags: propType.array.isRequired,
  onTagAdded: propType.func.isRequired,
  onTagRemoved: propType.func.isRequired
};

export default IssueTags;
