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
  let edges = hasNextPage ? data.slice(0, -1) : data;
  const totalCount = edges.length;
  edges = edges.map((node) => {
    const endCursor = toCursorHash(node.createdAt.toString());
    return {
      cursor: endCursor,
      node
    };
  });
  const startCursor = edges.length > 0 ? edges[0].cursor : null;
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
  return {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage: false,
      endCursor,
      startCursor
    },
    totalCount
  };
};

export const Edgify = () => async (parent) => {
  const cursor = toCursorHash(parent.createdAt.toString());
  return { cursor, node: parent };
};
