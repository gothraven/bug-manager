import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { authorize } from './auth.resolver';
import { USER, ADMIN } from '../../models/user.model';
import { Paginate } from './pagination.resolver';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return jwt.sign({ id, email, username, role }, secret, { expiresIn });
};

export default {
  Query: {
    users: combineResolvers(authorize(ADMIN), Paginate('User')),
    user: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) =>
      models.User.findById(id)),
    me: combineResolvers(authorize(USER), async (parent, args, { models, me }) =>
      models.User.findById(me.id))
  },
  Mutation: {
    signUp: async (parent, { name, email, password }, { models, secret, expiresIn }) => {
      const user = await models.User.create({ name, email, password });

      return { user, token: createToken(user, secret, expiresIn) };
    },

    signIn: async (parent, { email, password }, { models, secret, expiresIn }) => {
      const user = await models.User.findOne({ email }).exec();

      if (!user) {
        throw new Error('No user found with this login credentials');
      }

      const isValid = await user.passwordMatches(password);

      if (!isValid) {
        throw new Error('Invalid password');
      }

      return { user, token: createToken(user, secret, expiresIn) };
    },

    updateUser: combineResolvers(authorize(USER), async (parent, { email }, { models, me }) =>
      models.User.findByIdAndUpdate(me.id, { email }, { new: true })),

    deleteUser: combineResolvers(authorize(ADMIN), async (parent, { id }, { models }) => {
      const user = await models.User.findById(id);

      if (user) {
        await user.remove();
        return true;
      }
      return false;
    })
  }
};
