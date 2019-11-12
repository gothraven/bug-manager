/**
 * @flow
 * @relayHash 2820964c32509cd77db1e13b9f7154a2
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SigninUserMutationVariables = {|
  email: any,
  password: string,
|};
export type SigninUserMutationResponse = {|
  +signIn: {|
    +token: string,
    +user: {|
      +id: string
    |},
  |}
|};
export type SigninUserMutation = {|
  variables: SigninUserMutationVariables,
  response: SigninUserMutationResponse,
|};
*/

/*
mutation SigninUserMutation(
  $email: EmailAddress!
  $password: String!
) {
  signIn(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: "LocalArgument",
        name: "email",
        type: "EmailAddress!",
        defaultValue: null
      },
      {
        kind: "LocalArgument",
        name: "password",
        type: "String!",
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: "LinkedField",
        alias: null,
        name: "signIn",
        storageKey: null,
        args: [
          {
            kind: "Variable",
            name: "email",
            variableName: "email"
          },
          {
            kind: "Variable",
            name: "password",
            variableName: "password"
          }
        ],
        concreteType: "Auth",
        plural: false,
        selections: [
          {
            kind: "ScalarField",
            alias: null,
            name: "token",
            args: null,
            storageKey: null
          },
          {
            kind: "LinkedField",
            alias: null,
            name: "user",
            storageKey: null,
            args: null,
            concreteType: "User",
            plural: false,
            selections: [
              {
                kind: "ScalarField",
                alias: null,
                name: "id",
                args: null,
                storageKey: null
              }
            ]
          }
        ]
      }
    ];
  return {
    kind: "Request",
    fragment: {
      kind: "Fragment",
      name: "SigninUserMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "SigninUserMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "SigninUserMutation",
      id: null,
      text:
        "mutation SigninUserMutation(\n  $email: EmailAddress!\n  $password: String!\n) {\n  signIn(email: $email, password: $password) {\n    token\n    user {\n      id\n    }\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '4602bf71022badcb0de6813138c77dc3';
module.exports = node;
