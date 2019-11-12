/**
 * @flow
 * @relayHash c5fe431456f7696e7141c91c663bd22a
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TagMutationsCreateTagMutationVariables = {|
  name: string,
  description?: ?string,
  color: string,
|};
export type TagMutationsCreateTagMutationResponse = {|
  +createTag: {|
    +cursor: string,
    +node: {|
      +id: string,
      +name: string,
      +description: ?string,
      +color: string,
    |},
  |}
|};
export type TagMutationsCreateTagMutation = {|
  variables: TagMutationsCreateTagMutationVariables,
  response: TagMutationsCreateTagMutationResponse,
|};
*/

/*
mutation TagMutationsCreateTagMutation(
  $name: String!
  $description: String
  $color: HexColorCode!
) {
  createTag(name: $name, description: $description, color: $color) {
    cursor
    node {
      id
      name
      description
      color
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
        name: "description",
        type: "String",
        defaultValue: null
      },
      {
        kind: "LocalArgument",
        name: "color",
        type: "HexColorCode!",
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: "LinkedField",
        alias: null,
        name: "createTag",
        storageKey: null,
        args: [
          {
            kind: "Variable",
            name: "color",
            variableName: "color"
          },
          {
            kind: "Variable",
            name: "description",
            variableName: "description"
          },
          {
            kind: "Variable",
            name: "name",
            variableName: "name"
          }
        ],
        concreteType: "TagEdge",
        plural: false,
        selections: [
          {
            kind: "ScalarField",
            alias: null,
            name: "cursor",
            args: null,
            storageKey: null
          },
          {
            kind: "LinkedField",
            alias: null,
            name: "node",
            storageKey: null,
            args: null,
            concreteType: "Tag",
            plural: false,
            selections: [
              {
                kind: "ScalarField",
                alias: null,
                name: "id",
                args: null,
                storageKey: null
              },
              {
                kind: "ScalarField",
                alias: null,
                name: "name",
                args: null,
                storageKey: null
              },
              {
                kind: "ScalarField",
                alias: null,
                name: "description",
                args: null,
                storageKey: null
              },
              {
                kind: "ScalarField",
                alias: null,
                name: "color",
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
      name: "TagMutationsCreateTagMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "TagMutationsCreateTagMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "TagMutationsCreateTagMutation",
      id: null,
      text:
        "mutation TagMutationsCreateTagMutation(\n  $name: String!\n  $description: String\n  $color: HexColorCode!\n) {\n  createTag(name: $name, description: $description, color: $color) {\n    cursor\n    node {\n      id\n      name\n      description\n      color\n    }\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '20ee92c9f4cfb7b843a24a26497e3f53';
module.exports = node;
