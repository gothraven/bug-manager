export const toCursorHash = string => Buffer.from(string).toString('base64');

export const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

export const Paginate = model => async (parent, { after, first = 100 }, { models }) => {
  const cursorOptions = after
    ? {
      createdAt: {
        $lt: fromCursorHash(after)
      }
    }
    : {};
  const data = await models[model].find(cursorOptions, null, {
    sort: { createdAt: -1 },
    limit: first + 1
  });
  const hasNextPage = data.length > first;
  const edges = hasNextPage ? data.slice(0, -1) : data;
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
    }
  };
};
