import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";

function TagsView() {
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

  function onAddHandler() {
    setTags([...tags, { name: "", description: "", color: "#EB144C" }]);
  }

  return (
    <Grid
      container
      xs={12}
      direction="column"
      spacing={4}
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item>
        {tags.map(tag => (
          <TagPanel
            key={tag.id}
            tag={tag}
            onUpdate={onUpdateHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </Grid>
      <Grid item style={{ display: "grid", justifyContent: "center" }}>
        <Fab color="primary" aria-label="add" onClick={onAddHandler}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}

export default TagsView;
