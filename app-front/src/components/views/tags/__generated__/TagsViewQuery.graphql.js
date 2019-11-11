/**
 * @flow
 * @relayHash c652a0b45c794da268bcebb5884d1113
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TagsViewQueryVariables = {|
  first: any
|};
export type TagsViewQueryResponse = {|
  +tags: ?{|
    +edges: $ReadOnlyArray<{|
      +id: string,
      +createdAt: any,
      +updatedAt: any,
      +name: string,
      +description: ?string,
      +color: any,
    |}>,
    +pageInfo: {|
      +endCursor: ?string,
      +hasNextPage: boolean,
    |},
  |}
|};
export type TagsViewQuery = {|
  variables: TagsViewQueryVariables,
  response: TagsViewQueryResponse,
|};
*/


/*
query TagsViewQuery(
  $first: PositiveInt!
) {
  tags(first: $first) {
    edges {
      id
      createdAt
      updatedAt
      name
      description
      color
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "PositiveInt!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "tags",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      }
    ],
    "concreteType": "TagCursor",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "Tag",
        "plural": true,
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
            "name": "createdAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "updatedAt",
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "color",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "pageInfo",
        "storageKey": null,
        "args": null,
        "concreteType": "PageInfo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "endCursor",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasNextPage",
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
    "name": "TagsViewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TagsViewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "TagsViewQuery",
    "id": null,
    "text": "query TagsViewQuery(\n  $first: PositiveInt!\n) {\n  tags(first: $first) {\n    edges {\n      id\n      createdAt\n      updatedAt\n      name\n      description\n      color\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '28f56c4528e731e2fea5bb1285e3fcca';
module.exports = node;
