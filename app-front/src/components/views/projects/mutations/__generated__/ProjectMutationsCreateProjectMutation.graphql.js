/**
 * @flow
 * @relayHash 6060e83ad463a3a4d084d050cc466759
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProjectMutationsCreateProjectMutationVariables = {|
  name: string,
  description?: ?string,
|};
export type ProjectMutationsCreateProjectMutationResponse = {|
  +createProject: {|
    +cursor: string,
    +node: {|
      +id: string,
      +name: string,
      +description: ?string,
    |},
  |}
|};
export type ProjectMutationsCreateProjectMutation = {|
  variables: ProjectMutationsCreateProjectMutationVariables,
  response: ProjectMutationsCreateProjectMutationResponse,
|};
*/


/*
mutation ProjectMutationsCreateProjectMutation(
  $name: String!
  $description: String
) {
  createProject(name: $name, description: $description) {
    cursor
    node {
      id
      name
      description
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "description",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createProject",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "ProjectEdge",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "cursor",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProjectMutationsCreateProjectMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ProjectMutationsCreateProjectMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ProjectMutationsCreateProjectMutation",
    "id": null,
    "text": "mutation ProjectMutationsCreateProjectMutation(\n  $name: String!\n  $description: String\n) {\n  createProject(name: $name, description: $description) {\n    cursor\n    node {\n      id\n      name\n      description\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'aa843e6ee6c890321c0a478aab2e64af';
module.exports = node;
