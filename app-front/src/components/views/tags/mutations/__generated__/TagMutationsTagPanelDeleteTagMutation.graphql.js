/**
 * @flow
 * @relayHash cfd652ce8e43222bc2491dd4a28d7d14
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TagMutationsTagPanelDeleteTagMutationVariables = {|
  id: string
|};
export type TagMutationsTagPanelDeleteTagMutationResponse = {|
  +deleteTag: boolean
|};
export type TagMutationsTagPanelDeleteTagMutation = {|
  variables: TagMutationsTagPanelDeleteTagMutationVariables,
  response: TagMutationsTagPanelDeleteTagMutationResponse,
|};
*/

/*
mutation TagMutationsTagPanelDeleteTagMutation(
  $id: ID!
) {
  deleteTag(id: $id)
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: "LocalArgument",
        name: "id",
        type: "ID!",
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: "ScalarField",
        alias: null,
        name: "deleteTag",
        args: [
          {
            kind: "Variable",
            name: "id",
            variableName: "id"
          }
        ],
        storageKey: null
      }
    ];
  return {
    kind: "Request",
    fragment: {
      kind: "Fragment",
      name: "TagMutationsTagPanelDeleteTagMutation",
      type: "Mutation",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: "Operation",
      name: "TagMutationsTagPanelDeleteTagMutation",
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: "mutation",
      name: "TagMutationsTagPanelDeleteTagMutation",
      id: null,
      text:
        "mutation TagMutationsTagPanelDeleteTagMutation(\n  $id: ID!\n) {\n  deleteTag(id: $id)\n}\n",
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '9c9dbed6c97786dadcbc587ba7c3fbe4';
module.exports = node;
