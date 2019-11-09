import { GraphQLServer, AuthenticationError } from 'graphql-yoga';
import DataLoader from 'dataloader';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import models from '../api/models';
import loader from '../api/graphql/loaders';
import resolvers from '../api/graphql/resolvers';
import typesMerged from '../api/graphql/schema';
import { logs, jwtSecret, jwtExpirationInterval } from './vars';

const getMe = async (req) => {
  const token = req.headers['x-bearer-token'];

  if (token) {
    try {
      return await jwt.verify(token, jwtSecret);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
  return null;
};

const server = new GraphQLServer({
  typeDefs: typesMerged,
  resolvers,
  context: async ({ request }) => {
    const me = await getMe(request);

    return {
      models,
      me,
      secret: jwtSecret,
      expiresIn: `${jwtExpirationInterval}m`,
      loaders: {
        users: new DataLoader(keys => loader(keys, models, 'User')),
        issues: new DataLoader(keys => loader(keys, models, 'Issue')),
        tags: new DataLoader(keys => loader(keys, models, 'Tag')),
        projects: new DataLoader(keys => loader(keys, models, 'Project')),
        comments: new DataLoader(keys => loader(keys, models, 'Comment')),
        actions: new DataLoader(keys => loader(keys, models, 'Action')),
        statuses: new DataLoader(keys => loader(keys, models, 'Status'))
      }
    };
  }
});

server.express.use(cors());
server.express.use(morgan(logs));

export default server;
