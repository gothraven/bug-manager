import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated } from './auth.resolver';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return jwt.sign({ id, email, username, role }, secret, { expiresIn });
};

export default {
  Query: {
    users: combineResolvers(isAdmin, async (parent, args, { models }) => models.User.find()),
    user: combineResolvers(isAdmin, async (parent, { id }, { models }) => models.User.findById(id)),
    me: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return models.User.findById(me.id);
    })
  },
  Mutation: {
    signUp: async (parent, { name, email, password }, { models, secret, expiresIn }) => {
      const user = await models.User.create({
        name,
        email,
        password
      });

      return { user, token: createToken(user, secret, expiresIn) };
    },

    signIn: async (parent, { email, password }, { models, secret, expiresIn }) => {
      const user = await models.User.findOne({ email }).exec();

      if (!user) {
        throw new Error('No user found with this login credentials.');
      }

      const isValid = await user.passwordMatches(password);

      if (!isValid) {
        throw new Error('Invalid password.');
      }

      return { user, token: createToken(user, secret, expiresIn) };
    },

    updateUser: combineResolvers(isAuthenticated, async (parent, { email }, { models, me }) =>
      models.User.findByIdAndUpdate(me.id, { email }, { new: true })),

    deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      const user = await models.User.findById(id);

      if (user) {
        await user.remove();
        return true;
      }
      return false;
    })
  },

  User: {
    // add here some stuff about the user
  }
};
