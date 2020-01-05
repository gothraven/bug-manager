export const toCursorHash = string => Buffer.from(string).toString('base64');

export const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

export const Paginate = model => async (parent, { after, first = 100, filters = null}, { models }) => {

  filters = JSON.parse(filters);

  const cursorOptions = after
    ? {
      createdAt: {
        $lt: fromCursorHash(after)
      },
      ...filters
    }
    : filters;
    
  const data = await models[model].find(cursorOptions, null, {
    sort: { createdAt: -1 },
    limit: first + 1
  });
  const hasNextPage = data.length > first;
  const edges = hasNextPage ? data.slice(0, -1) : data;
  const endCursor =
    edges.length > 0 ? toCursorHash(edges[edges.length - 1].createdAt.toString()) : null;

  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor
    }
  };
};