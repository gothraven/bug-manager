import React from 'react';
import propType from "prop-types";
import Box from "@material-ui/core/Box";
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';


import useStyles from './AutoCompletePopper.scss';

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

function AutoCompletePopper(props) {
  const {
    open, anchorEl, onChange, onClose, renderOption,
    pendingValues, selectedValues, allValues, loading,
    noOptionsText, multiple, hasMore, fetchMore, title,
  } = props;
  const classes = useStyles();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      className={classes.popper}
    >
      <Box className={classes.header}>
        {title}
      </Box>
      <Autocomplete
        open
        loading={loading}
        onClose={onClose}
        multiple={multiple}
        classes={{
          paper: classes.paper,
          option: classes.option,
          popperDisablePortal: classes.popperDisablePortal,
        }}
        value={pendingValues}
        onChange={onChange}
        disableCloseOnSelect
        disablePortal
        renderTags={() => null}
        includeInputInList
        ListboxComponent={React.forwardRef((allProps, ref) => (
          <LoadMoreList ref={ref} hasMore={hasMore} onLoadMore={fetchMore} {...allProps} />
        ))}
        noOptionsText={noOptionsText}
        renderOption={renderOption}
        options={allValues.sort((a, b) => {
          // Display the selected labels first.
          let ai = selectedValues.indexOf(a);
          ai = ai === -1 ? selectedValues.length + selectedValues.indexOf(a) : ai;
          let bi = selectedValues.indexOf(b);
          bi = bi === -1 ? selectedValues.length + selectedValues.indexOf(b) : bi;
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
  );
}

AutoCompletePopper.defaultProps = {
  // Popper Props
  anchorEl: null,
  // AutoComplete Props
  multiple: false,
  open: false,
  loading: false,
}

AutoCompletePopper.propTypes = {
  selectedValues: propType.array.isRequired,
  pendingValues: propType.array.isRequired,
  allValues: propType.array.isRequired,
  hasMore: propType.bool.isRequired,
  fetchMore: propType.func.isRequired,
  title: propType.string.isRequired,
  // Popper Props
  onClose: propType.func.isRequired,
  anchorEl: propType.object,
  // AutoComplete Props
  onChange: propType.func.isRequired,
  multiple: propType.bool,
  open: propType.bool,
  loading: propType.bool,
  renderOption: propType.func.isRequired,
  noOptionsText: propType.string.isRequired,
};

export default AutoCompletePopper;