import { EmailAddressResolver, HexColorCodeResolver, DateTimeResolver } from 'graphql-scalars';

import tagResolvers from './tag.resolver';
import userResolvers from './user.resolver';
import statusResolvers from './status.resolver';

const customScalarResolver = {
  Date: DateTimeResolver,
  Email: EmailAddressResolver,
  Color: HexColorCodeResolver
};

export default [customScalarResolver, userResolvers, tagResolvers, statusResolvers];
