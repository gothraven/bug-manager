import { useCallback } from "react";
import { graphql } from "react-relay";

import useMutation from "../../../core/hooks/useMutation";
import { signIn } from "../../../core/utils/Auth";

export const SignUpUserMutation = graphql`
  mutation SignUpUserMutation($name: String!, $email: EmailAddress!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export function useSignUp(name, email, password) {
  const [isSignUpPending, signUpUser] = useMutation(SignUpUserMutation);

  const onSignUp = useCallback(() => {
    signUpUser({
      variables: { name, email, password },
      onCompleted: response => {
        const {
          token,
          user: { id }
        } = response.signUp;
        signIn(id, token);
        window._history.push("/");
      }
    });
  }, [signUpUser, name, email, password]);

  return [isSignUpPending, onSignUp];
}
