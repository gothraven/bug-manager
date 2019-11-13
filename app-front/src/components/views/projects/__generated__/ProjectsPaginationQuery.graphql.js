/**
 * @flow
 * @relayHash fd950a5a706dac402bf7e94a976a0833
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ProjectsView_projects$ref = any;
export type ProjectsPaginationQueryVariables = {|
  first?: ?number,
  after?: ?string,
|};
export type ProjectsPaginationQueryResponse = {|
  +$fragmentRefs: ProjectsView_projects$ref
|};
export type ProjectsPaginationQuery = {|
  variables: ProjectsPaginationQueryVariables,
  response: ProjectsPaginationQueryResponse,
|};
*/


/*
query ProjectsPaginationQuery(
  $first: PositiveInt = 10
  $after: String = ""
) {
  ...ProjectsView_projects_2HEEH6
}

fragment ProjectsView_projects_2HEEH6 on Query {
  projects(first: $first, after: $after) {
    edges {
      node {
        id
        name
        description
        __typename
      }
      cursor
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
    "type": "PositiveInt",
    "defaultValue": 10
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": ""
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ProjectsPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ProjectsView_projects",
        "args": (v1/*: any*/)
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProjectsPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "projects",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "ProjectCursor",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "ProjectEdge",
            "plural": true,
            "selections": [
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
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
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "projects",
        "args": (v1/*: any*/),
        "handle": "connection",
        "key": "Query_projects",
        "filters": []
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ProjectsPaginationQuery",
    "id": null,
    "text": "query ProjectsPaginationQuery(\n  $first: PositiveInt = 10\n  $after: String = \"\"\n) {\n  ...ProjectsView_projects_2HEEH6\n}\n\nfragment ProjectsView_projects_2HEEH6 on Query {\n  projects(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {
      "derivedFrom": "ProjectsView_projects",
      "isRefetchableQuery": true
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1926d6a2e9bf9f2f606ceac2498a5a34';
module.exports = node;
