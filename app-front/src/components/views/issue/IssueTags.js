import React from "react";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { invertColor } from "../../core/utils/Functions";

function IssueToolBar(props) {
  const { tags } = props;

  return (
    <Box m={2}>
      <Paper style={{ padding: 10 }}>
        <Typography
          variant="h3"
          style={{ textTransform: "uppercase", color: "#2E231C" }}
        >
          associated tags
        </Typography>
        <Divider />
        {tags.map(tag => (
          <Chip
            key={tag.id}
            label={tag.name}
            style={{
              borderColor: tag.color,
              backgroundColor: tag.color,
              color: invertColor(tag.color)
            }}
            variant="outlined"
          />
        ))}
      </Paper>
    </Box>
  );
}

IssueToolBar.propTypes = {
  tags: PropType.array.isRequired
};

export default IssueToolBar;
