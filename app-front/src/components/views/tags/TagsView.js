import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";
import Loading from "../../lib/Loading";
import { usePagination } from "../../core/hooks";
import { Can, AbilityContext } from "../../core/Ability";
import { TAGS_QUERY, CREATE_TAG } from "../../core/models/tags/tags.graphql";

function TagsView() {
  const ability = useContext(AbilityContext)
  const { data, loading: loadingTags, fetchMore } = usePagination(
    TAGS_QUERY,
    "tags"
  );
  const [onCreateTag, { loading: isTagCreatePending }] = useMutation(
    CREATE_TAG,
    {
      variables: { name: "Tag", description: "", color: "#22194D" },
      update: (proxy, result) => {
        const { createTag } = result.data;
        const { tags } = proxy.readQuery({ query: TAGS_QUERY });
        proxy.writeQuery({
          query: TAGS_QUERY,
          data: {
            tags: { ...tags, edges: [createTag, ...tags.edges] }
          }
        });
      }
    }
  );

  if (loadingTags) {
    return <Loading />;
  }

  const { hasNextPage } = data.tags.pageInfo;

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
        {data.tags.edges.map(node => {
          if (node === null) {
            return null;
          }
          return (
            <TagPanel disabled={!ability.can("edit", 'Tag')} key={node.id} tag={node} />
          );
        })}
      </Grid>
      {hasNextPage && <Button onClick={fetchMore}>load more</Button>}
      <Can I="create" a="Tag">
        {() => (
          <Grid item style={{ display: "grid", justifyContent: "center", padding: 30 }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={onCreateTag}
              disabled={isTagCreatePending}
            >
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </Can>
    </Grid>
  );
}

export default TagsView;
