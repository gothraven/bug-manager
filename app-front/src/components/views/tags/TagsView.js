import React from "react";
import propTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";
import { ADMIN } from "../../core/constants";
import Loading from "../../lib/Loading";
import { usePagination } from "../../core/hooks";
import { TAGS_QUERY, CREATE_TAG } from "../../core/models/tags/tags.queries";


function TagsView(props) {
  const { me } = props;
  const { data, loading: loadingTags, fetchMore } = usePagination(TAGS_QUERY, 'tags');
  const [onCreateTag, { loading: isTagCreatePending }] = useMutation(CREATE_TAG, {
    variables: { name: "Tag", description: "", color: "#22194D" },
    update: (proxy, result) => {
      const { createTag } = result.data;
      const { tags } = proxy.readQuery({ query: TAGS_QUERY });
      proxy.writeQuery({
        query: TAGS_QUERY,
        data: {
          tags: { ...tags, edges: [createTag, ...tags.edges] }
        },
      });
    }
  });

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
          return <TagPanel disabled={me.role !== ADMIN} key={node.id} tag={node} />;
        })}
      </Grid>
      {hasNextPage && <Button onClick={fetchMore}>load more</Button>}
      {me.role === ADMIN &&
        <Grid
          item
          style={{ display: "grid", justifyContent: "center", padding: 30 }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={onCreateTag}
            disabled={isTagCreatePending}
          >
            <AddIcon />
          </Fab>
        </Grid>
      }
    </Grid>
  );
}

TagsView.defaultProps = {
  me: null,
};

TagsView.propTypes = {
  me: propTypes.shape({
    id: propTypes.string,
    name: propTypes.string,
    email: propTypes.string,
    role: propTypes.string,
  }),
};

export default TagsView;
