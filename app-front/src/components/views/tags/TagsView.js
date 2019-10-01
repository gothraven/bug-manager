import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  }
}));

function TagsView() {
  const classes = useStyles();
  const [tags, setTags] = useState([
    { id: 1, name: "tata", description: "description 1", color: "#22194D" },
    { id: 2, name: "toto", description: "description 2", color: "#FF6900" },
    { id: 3, name: "tato", description: "description 3", color: "#0693E3" },
    { id: 4, name: "titi", description: "description 4", color: "#EB144C" }
  ]);

  function onDeleteHandler(id) {
    setTags(tags.filter(tag => tag.id !== id));
  }

  function onUpdateHandler(tag) {
    setTags(tags.map(_tag => (_tag.id === tag.id ? tag : _tag)));
  }

  return (
    <div className={classes.root}>
      {tags.map(tag => (
        <TagPanel
          key={tag.id}
          tag={tag}
          onUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
        />
      ))}
      <Fab
        color="primary"
        aria-label="add"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default TagsView;
