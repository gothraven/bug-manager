/**
 * @flow
 * @relayHash e41f4be8b9c31c1d33ab7f9305a994ab
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TagMutationsTagPanelUpdateTagMutationVariables = {|
  id: string,
  name?: ?string,
  description?: ?string,
  color?: ?string,
|};
export type TagMutationsTagPanelUpdateTagMutationResponse = {|
  +updateTag: {|
    +cursor: string,
    +node: {|
      +id: string,
      +name: string,
      +description: ?string,
      +color: string,
    |},
  |}
|};
export type TagMutationsTagPanelUpdateTagMutation = {|
  variables: TagMutationsTagPanelUpdateTagMutationVariables,
  response: TagMutationsTagPanelUpdateTagMutationResponse,
|};
*/

/*
mutation TagMutationsTagPanelUpdateTagMutation(
  $id: ID!
  $name: String
  $description: String
  $color: HexColorCode
) {
  updateTag(id: $id, name: $name, description: $description, color: $color) {
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
        name: "id",
        type: "ID!",
        defaultValue: null
      },
      {
        kind: "LocalArgument",
        name: "name",
        type: "String",
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
        type: "HexColorCode",
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: "LinkedField",
        alias: null,
        name: "updateTag",
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
            name: "id",
            variableName: "id"
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
      name: "TagMutationsTagPanelUpdateTagMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "TagMutationsTagPanelUpdateTagMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "TagMutationsTagPanelUpdateTagMutation",
      id: null,
      text:
        "mutation TagMutationsTagPanelUpdateTagMutation(\n  $id: ID!\n  $name: String\n  $description: String\n  $color: HexColorCode\n) {\n  updateTag(id: $id, name: $name, description: $description, color: $color) {\n    cursor\n    node {\n      id\n      name\n      description\n      color\n    }\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '05f2edc3ff4675a5cc73d9e3d3c60007';
module.exports = node;
