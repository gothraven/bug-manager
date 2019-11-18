import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { graphql, usePaginationFragment } from "react-relay/hooks";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import TagPanel from "./TagPanel";
import { useCreateTag } from "./mutations/TagMutations";

function TagsView(props) {
  const { queryData } = props;
  const [isTagCreatePending, onCreateTag] = useCreateTag();
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment TagsView_tags on Query
        @argumentDefinitions(
          first: { type: "PositiveInt", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
        )
        @refetchable(queryName: "TagsPaginationQuery") {
        tags(first: $first, after: $after)
          @connection(key: "Query_tags", filters: []) {
          edges {
            node {
              id
              name
              description
              color
            }
          }
        }
      }
    `,
    queryData
  );

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

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
      <Divider />
      <Grid item>
        {data.tags.edges.map(edge => {
          if (edge == null || edge.node == null) {
            return null;
          }
          return <TagPanel key={edge.node.id} tag={edge.node} />;
        })}
      </Grid>
      <Button onClick={loadMore} disabled={!hasNext}>
        load more
      </Button>
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
    </Grid>
  );
}

TagsView.defaultProps = {
  queryData: undefined
};

TagsView.propTypes = {
  queryData: PropTypes.object
};

export default TagsView;
