

export const MeFragment = `
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
  console.log('useMe', queryData)

  return {
    id: 'something',
    name: 'Safiy',
    email: 'foo@bar.co',
    role: 'ADMIN'
  };
}
