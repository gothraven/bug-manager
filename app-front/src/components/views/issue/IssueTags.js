import React from "react";
import PropType from "prop-types";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

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
            color="primary"
            size="small"
            label={tag.name.toUpperCase()}
            onDelete={() => {}}
            style={{
              fontSize: 12,
              fontWeight: 400,
              margin: 5,
              padding: 1,
              paddingTop: 10,
              paddingBottom: 10,
              marginLeft: 0,
              backgroundColor: tag.color,
              textAlign: "center"
            }}
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
