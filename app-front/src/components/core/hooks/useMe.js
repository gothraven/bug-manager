import { useQuery } from '@apollo/react-hooks';
import { ME_QUERY } from '../models/users/users.queries';


export default function useMe() {
  const { data, error, loading } = useQuery(ME_QUERY);
  console.log(loading)
  return { me: (data || {}).me, error, loading };
}
