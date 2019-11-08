import { GraphQLDateTime } from 'graphql-iso-date';

import tagResolvers from './tag.resolver';
import userResolvers from './user.resolver';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [customScalarResolver, tagResolvers, userResolvers];
