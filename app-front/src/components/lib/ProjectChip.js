import React from "react";
import propTypes from "prop-types";
import { useTheme } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

function ProjectChip(props) {
  const {
    project: { name = "", color },
    style
  } = props;
  const theme = useTheme();

  return (
    <Chip
      label={name}
      style={{
        fontWeight: 400,
        borderColor: color,
        backgroundColor: color,
        color: theme.palette.getContrastText(color),
        ...style
      }}
      variant="outlined"
    />
  );
}

ProjectChip.propTypes = {
  project: propTypes.object.isRequired
};

export default ProjectChip;
