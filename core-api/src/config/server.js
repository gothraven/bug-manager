// import DataLoader from 'dataloader';
import { GraphQLServer } from 'graphql-yoga';

const resolvers = {
  Query: {
    info: () => 'This is not the API of a Hackernews Clone'
  }
};

const server = new GraphQLServer({
  typeDefs: 'src/api/schema/schema.graphql',
  resolvers,
  context: async () => ({
    loaders: {}
  })
});

export default server;
