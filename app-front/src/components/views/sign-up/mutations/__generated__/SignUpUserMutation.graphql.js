/**
 * @flow
 * @relayHash 4bff5384bb1f2fc34747cf8fec30be2b
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SignUpUserMutationVariables = {|
  name: string,
  email: any,
  password: string,
|};
export type SignUpUserMutationResponse = {|
  +signUp: {|
    +token: string,
    +user: {|
      +id: string
    |},
  |}
|};
export type SignUpUserMutation = {|
  variables: SignUpUserMutationVariables,
  response: SignUpUserMutationResponse,
|};
*/

/*
mutation SignUpUserMutation(
  $name: String!
  $email: EmailAddress!
  $password: String!
) {
  signUp(name: $name, email: $email, password: $password) {
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
        name: "name",
        type: "String!",
        defaultValue: null
      },
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
        name: "signUp",
        storageKey: null,
        args: [
          {
            kind: "Variable",
            name: "email",
            variableName: "email"
          },
          {
            kind: "Variable",
            name: "name",
            variableName: "name"
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
      name: "SignUpUserMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "SignUpUserMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "SignUpUserMutation",
      id: null,
      text:
        "mutation SignUpUserMutation(\n  $name: String!\n  $email: EmailAddress!\n  $password: String!\n) {\n  signUp(name: $name, email: $email, password: $password) {\n    token\n    user {\n      id\n    }\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '1332ae4cc0c0961027f254c9e1a4ad4d';
module.exports = node;
