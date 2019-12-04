import { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";

export default function usePagination(query, model, options = {}) {
  const { data, error, loading, fetchMore } = useQuery(query, options);

  const loadMore = useCallback(() => {
    const { endCursor, hasNextPage } = data.tags.pageInfo;

    if (loading || !hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        cursor: endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult[model].edges;
        const { pageInfo } = fetchMoreResult[model];

        return newEdges.length
          ? {
            [model]: {
              __typename: previousResult[model].__typename,
              edges: [...previousResult[model].edges, ...newEdges],
              pageInfo
            }
          }
          : previousResult;
      }
    });
  }, [data, loading, fetchMore, model]);

  return { data, error, loading, fetchMore: loadMore };
}
