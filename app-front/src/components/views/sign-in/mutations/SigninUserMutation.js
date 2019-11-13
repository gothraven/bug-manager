import { useCallback } from "react";
import { graphql } from "react-relay";

import useMutation from "../../../core/hooks/useMutation";
import { signIn } from "../../../core/utils/Auth";

export const SignInUserMutation = graphql`
  mutation SignInUserMutation($email: EmailAddress!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export function useSignIn(email, password) {
  const [isSignInPending, signInUser] = useMutation(SignInUserMutation);

  const onSignIn = useCallback(() => {
    signInUser({
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
  }, [signInUser, email, password]);

  return [isSignInPending, onSignIn];
}
