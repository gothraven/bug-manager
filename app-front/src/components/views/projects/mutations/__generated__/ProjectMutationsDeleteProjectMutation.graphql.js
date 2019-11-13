/**
 * @flow
 * @relayHash 30c01f7bba621854c3f533cb36bc3f10
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProjectMutationsDeleteProjectMutationVariables = {|
  id: string
|};
export type ProjectMutationsDeleteProjectMutationResponse = {|
  +deleteProject: boolean
|};
export type ProjectMutationsDeleteProjectMutation = {|
  variables: ProjectMutationsDeleteProjectMutationVariables,
  response: ProjectMutationsDeleteProjectMutationResponse,
|};
*/


/*
mutation ProjectMutationsDeleteProjectMutation(
  $id: ID!
) {
  deleteProject(id: $id)
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
    "name": "deleteProject",
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
    "name": "ProjectMutationsDeleteProjectMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProjectMutationsDeleteProjectMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ProjectMutationsDeleteProjectMutation",
    "id": null,
    "text": "mutation ProjectMutationsDeleteProjectMutation(\n  $id: ID!\n) {\n  deleteProject(id: $id)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '57da796fdd9dfb62a6234a91c99b7c77';
module.exports = node;
