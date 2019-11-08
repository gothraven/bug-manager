// import DataLoader from 'dataloader';
import { GraphQLServer, AuthenticationError } from 'graphql-yoga';
import DataLoader from 'dataloader';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import models from '../api/models';
import loaders from '../api/graphql/loaders';
import resolvers from '../api/graphql/resolvers';
import typesMerged from '../api/graphql/schema';
import { jwtSecret, jwtExpirationInterval } from './vars';

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
  context: async (args) => {
    const me = await getMe(args.request);

    return {
      models,
      me,
      secret: jwtSecret,
      expiresIn: `${jwtExpirationInterval}m`,
      loaders: {
        tag: new DataLoader(keys => loaders.tag(keys, models))
      }
    };
  }
});

server.express.use(cors());
server.express.use(morgan('dev'));

export default server;
