import {
  EmailAddressResolver,
  HexColorCodeResolver,
  PositiveIntResolver,
  DateTimeResolver
} from 'graphql-scalars';

import tagResolvers from './tag.resolver';
import userResolvers from './user.resolver';
import statusResolvers from './status.resolver';
import projectResolvers from './project.resolver';
import issueResolvers from './issue.resolver';
import commentResolvers from './comment.resolver';
import changeResolvers from './change.resolver';

const customScalarResolver = {
  Date: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  HexColorCode: HexColorCodeResolver,
  PositiveInt: PositiveIntResolver
};

export default [
  customScalarResolver,
  userResolvers,
  tagResolvers,
  statusResolvers,
  projectResolvers,
  issueResolvers,
  commentResolvers,
  changeResolvers
];
