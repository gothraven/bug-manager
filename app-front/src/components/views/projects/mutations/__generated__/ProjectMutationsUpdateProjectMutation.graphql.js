/**
 * @flow
 * @relayHash af66e10fbf666f84ecf28f2b79ef7f9e
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProjectMutationsUpdateProjectMutationVariables = {|
  id: string,
  name?: ?string,
  description?: ?string,
|};
export type ProjectMutationsUpdateProjectMutationResponse = {|
  +updateProject: {|
    +cursor: string,
    +node: {|
      +id: string,
      +name: string,
      +description: ?string,
    |},
  |}
|};
export type ProjectMutationsUpdateProjectMutation = {|
  variables: ProjectMutationsUpdateProjectMutationVariables,
  response: ProjectMutationsUpdateProjectMutationResponse,
|};
*/

/*
mutation ProjectMutationsUpdateProjectMutation(
  $id: ID!
  $name: String
  $description: String
) {
  updateProject(id: $id, name: $name, description: $description) {
    cursor
    node {
      id
      name
      description
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
      }
    ],
    v1 = [
      {
        kind: "LinkedField",
        alias: null,
        name: "updateProject",
        storageKey: null,
        args: [
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
        concreteType: "ProjectEdge",
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
            concreteType: "Project",
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
      name: "ProjectMutationsUpdateProjectMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "ProjectMutationsUpdateProjectMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "ProjectMutationsUpdateProjectMutation",
      id: null,
      text:
        "mutation ProjectMutationsUpdateProjectMutation(\n  $id: ID!\n  $name: String\n  $description: String\n) {\n  updateProject(id: $id, name: $name, description: $description) {\n    cursor\n    node {\n      id\n      name\n      description\n    }\n  }\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'ba31e9b78663756b488a33a24c9da59f';
module.exports = node;
