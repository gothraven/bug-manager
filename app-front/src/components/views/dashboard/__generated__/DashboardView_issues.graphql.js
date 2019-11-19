/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DashboardView_issues$ref: FragmentReference;
declare export opaque type DashboardView_issues$fragmentType: DashboardView_issues$ref;
export type DashboardView_issues = {|
  +issues: ?{|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +createdAt: any,
        +updatedAt: any,
        +title: string,
        +creator: {|
          +id: string,
          +name: string,
        |},
        +status: ?{|
          +id: string,
          +name: string,
        |},
        +open: boolean,
        +assignedUsers: $ReadOnlyArray<{|
          +id: string,
          +name: string,
        |}>,
        +tags: $ReadOnlyArray<{|
          +id: string,
          +name: string,
          +color: string,
        |}>,
        +project: ?{|
          +name: string
        |},
      |}
    |}>
  |},
  +$refType: DashboardView_issues$ref,
|};
export type DashboardView_issues$data = DashboardView_issues;
export type DashboardView_issues$key = {
  +$data?: DashboardView_issues$data,
  +$fragmentRefs: DashboardView_issues$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  "issues"
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Fragment",
  "name": "DashboardView_issues",
  "type": "Query",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "operation": require('./IssuesPaginationQuery.graphql.js'),
      "fragmentPathInResult": []
    }
  },
  "argumentDefinitions": [
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
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "issues",
      "name": "__Query_issues_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "IssueCursor",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "IssueEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Issue",
              "plural": false,
              "selections": [
                (v1/*: any*/),
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
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "creator",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "User",
                  "plural": false,
                  "selections": (v3/*: any*/)
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "status",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Status",
                  "plural": false,
                  "selections": (v3/*: any*/)
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "open",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "assignedUsers",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "User",
                  "plural": true,
                  "selections": (v3/*: any*/)
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "tags",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Tag",
                  "plural": true,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/),
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
                  "name": "project",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Project",
                  "plural": false,
                  "selections": [
                    (v2/*: any*/)
                  ]
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '996fccac1f09db388fd6822cfbce1443';
module.exports = node;
