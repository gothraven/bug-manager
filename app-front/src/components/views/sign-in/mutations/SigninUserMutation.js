import { useCallback } from "react";
import { graphql } from "react-relay";

import useMutation from "../../../core/hooks/useMutation";
import { signIn } from "../../../core/utils/Auth";

export const SigninUserMutation = graphql`
  mutation SigninUserMutation($email: EmailAddress!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export function useSignIn(email, password) {
  const [isSignInPending, signinUser] = useMutation(SigninUserMutation);

  const onSignIn = useCallback(() => {
    signinUser({
      variables: { email, password },
      onCompleted: response => {
        const {
          token,
          user: { id }
        } = response.signIn;
        signIn(id, token);
        window._history.push("/");
      }
    });
  }, [signinUser, email, password]);

  return [isSignInPending, onSignIn];
}
