import { EmailAddressResolver, HexColorCodeResolver, DateTimeResolver } from 'graphql-scalars';

import tagResolvers from './tag.resolver';
import userResolvers from './user.resolver';

const customScalarResolver = {
  Date: DateTimeResolver,
  Email: EmailAddressResolver,
  Color: HexColorCodeResolver
};

export default [customScalarResolver, tagResolvers, userResolvers];
