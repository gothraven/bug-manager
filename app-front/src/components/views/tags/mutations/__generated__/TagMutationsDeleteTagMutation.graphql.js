/**
 * @flow
 * @relayHash d3023cf3b29aed9733858300d89e4893
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TagMutationsDeleteTagMutationVariables = {|
  id: string
|};
export type TagMutationsDeleteTagMutationResponse = {|
  +deleteTag: boolean
|};
export type TagMutationsDeleteTagMutation = {|
  variables: TagMutationsDeleteTagMutationVariables,
  response: TagMutationsDeleteTagMutationResponse,
|};
*/


/*
mutation TagMutationsDeleteTagMutation(
  $id: ID!
) {
  deleteTag(id: $id)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "deleteTag",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TagMutationsDeleteTagMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TagMutationsDeleteTagMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TagMutationsDeleteTagMutation",
    "id": null,
    "text": "mutation TagMutationsDeleteTagMutation(\n  $id: ID!\n) {\n  deleteTag(id: $id)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '70c8cb9af43159263c30aff0d0e969d7';
module.exports = node;
