import React from "react";
import propTypes from "prop-types";
import { useTheme } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

function TagChip(props) {
  const {
    tag: { name, color },
    style
  } = props;
  const theme = useTheme();

  return (
    <Chip
      label={name}
      style={{
        fontWeight: 500,
        borderColor: color,
        backgroundColor: color,
        color: theme.palette.getContrastText(color),
        ...style
      }}
      variant="outlined"
    />
  );
}

TagChip.propTypes = {
  tag: propTypes.object.isRequired
};

export default TagChip;
