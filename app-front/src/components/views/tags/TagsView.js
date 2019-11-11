import React, { useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";

function TagsView() {
  const data = useLazyLoadQuery(
    graphql`
      query TagsViewQuery($first: PositiveInt!) {
        tags(first: $first) {
          edges {
            id
            createdAt
            updatedAt
            name
            description
            color
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
    {first: 10},
    {fetchPolicy: 'store-or-network'},
  );

  const [tags, setTags] = useState(data.tags.edges || []);

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
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        All labels
      </Typography>
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
      <Grid
        item
        style={{ display: "grid", justifyContent: "center", padding: 30 }}
      >
        <Fab color="primary" aria-label="add" onClick={onAddHandler}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}

export default TagsView;
