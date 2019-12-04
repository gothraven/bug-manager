import React, { useState } from "react";
import PropType from "prop-types";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import { usePagination } from "../../core/hooks";
import TagChip from "../../lib/TagChip";

import useStyles from "./IssueTags.scss";
import { TAGS_QUERY } from "../../core/models/tags/tags.graphql";


const LoadMoreList = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { children, hasMore, onLoadMore, ...other } = props;

  return (
    <ul ref={ref} {...other}>
      {children}
      {hasMore &&
        <Button style={{ width: "100%" }} onClick={onLoadMore}>
          load more
        </Button>
      }
    </ul>
  )
});


function IssueToolBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tags, setTags] = useState(props.tags);
  const [pendingTags, setPendingTags] = useState(props.tags);
  const { data, loading: loadingTags, fetchMore } = usePagination(
    TAGS_QUERY, "tags", { notifyOnNetworkStatusChange: true });

  function handleRemovedTags() {
    const result = tags.filter(tag => !pendingTags.includes(tag));
    console.log('removed', result)
  }

  function handleAddedTags() {
    const result = pendingTags.filter(tag => !tags.includes(tag));
    console.log('added', result)
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

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Grid container justify="space-between" alignContent="center">
          <Typography
            variant="h3"
            style={{ textTransform: "uppercase", color: "#2E231C" }}
          >
            Tags
          </Typography>
          <IconButton component="span" style={{ padding: 0 }} onClick={handleClick}>
            <SettingsIcon />
          </IconButton>
        </Grid>
        <Divider />
        {tags.map((tag, index) => (
          <Box key={tag.id || index}>
            <TagChip tag={tag} style={{ marginTop: 5 }} />
          </Box>
        ))}
        {tags.length === 0 &&
          <Typography style={{ marginTop: 10 }}>
            None yet
          </Typography>
        }
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          className={classes.popper}
        >
          <Box className={classes.header}>
            Apply labels
          </Box>
          <Autocomplete
            open
            loading={loadingTags}
            onClose={handleClose}
            multiple
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal,
            }}
            value={pendingTags}
            onChange={(event, newValue) => {
              setPendingTags(newValue);
            }}
            disableCloseOnSelect
            disablePortal
            renderTags={() => null}
            includeInputInList
            ListboxComponent={React.forwardRef((allProps, ref) => {
              let hasMore = false;
              if (data && data.tags && data.tags.pageInfo) {
                const { hasNextPage } = data.tags.pageInfo;
                hasMore = hasNextPage;
              }
              return <LoadMoreList ref={ref} {...allProps} hasMore={hasMore} onLoadMore={fetchMore} />;
            })}
            noOptionsText="No labels"
            renderOption={(option, { selected }) => (
              <>
                <DoneIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? 'visible' : 'hidden' }}
                />
                <span className={classes.color} style={{ backgroundColor: option.color }} />
                <div className={classes.text}>
                  {option.name}
                  <br />
                  {option.description}
                </div>
                <CloseIcon
                  className={classes.close}
                  style={{ visibility: selected ? 'visible' : 'hidden' }}
                />
              </>
            )}
            options={loadingTags ? [] : _.uniqBy([...props.tags, ...data.tags.edges], 'id').sort((a, b) => {
              // Display the selected labels first.
              let ai = tags.indexOf(a);
              ai = ai === -1 ? tags.length + tags.indexOf(a) : ai;
              let bi = tags.indexOf(b);
              bi = bi === -1 ? tags.length + tags.indexOf(b) : bi;
              return ai - bi;
            })}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            )}
          />
        </Popper>
      </Paper>
    </Box>
  );
}

IssueToolBar.propTypes = {
  tags: PropType.array.isRequired,
};

export default IssueToolBar;
