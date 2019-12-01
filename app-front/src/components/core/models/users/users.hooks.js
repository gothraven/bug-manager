/* eslint-disable import/prefer-default-export */
import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "./users.graphql";

export function useMe() {
  const { data, error, loading } = useQuery(ME_QUERY);

  return { me: (data || {}).me, error, loading };
}
