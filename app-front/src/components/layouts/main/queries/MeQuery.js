import { graphql, useFragment } from "react-relay/hooks";


export const MeFragment = graphql`
  fragment MeQuery_me on Query {
    me {
      id
      name
      role
      email
    }
  }
`;

export function useMe(queryData) {
  const { me } = useFragment(MeFragment, queryData);

  return me;
}
