/* eslint-disable import/prefer-default-export */
import { gql } from "apollo-boost";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      role
      email
    }
  }
`;
