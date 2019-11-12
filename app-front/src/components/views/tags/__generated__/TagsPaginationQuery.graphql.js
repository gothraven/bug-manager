/**
 * @flow
 * @relayHash 2387310787170cfa63aa694e4065bd00
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TagsView_tags$ref = any;
export type TagsPaginationQueryVariables = {|
  first?: ?number,
  after?: ?string,
|};
export type TagsPaginationQueryResponse = {|
  +$fragmentRefs: TagsView_tags$ref
|};
export type TagsPaginationQuery = {|
  variables: TagsPaginationQueryVariables,
  response: TagsPaginationQueryResponse,
|};
*/

/*
query TagsPaginationQuery(
  $first: PositiveInt = 10
  $after: String = ""
) {
  ...TagsView_tags_2HEEH6
}

fragment TagsView_tags_2HEEH6 on Query {
  tags(first: $first, after: $after) {
    edges {
      node {
        id
        name
        description
        color
        __typename
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: "LocalArgument",
        name: "first",
        type: "PositiveInt",
        defaultValue: 10
      },
      {
        kind: "LocalArgument",
        name: "after",
        type: "String",
        defaultValue: ""
      }
    ],
    v1 = [
      {
        kind: "Variable",
        name: "after",
        variableName: "after"
      },
      {
        kind: "Variable",
        name: "first",
        variableName: "first"
      }
    ];
  return {
    kind: "Request",
    fragment: {
      kind: "Fragment",
      name: "TagsPaginationQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: "FragmentSpread",
          name: "TagsView_tags",
          args: (v1 /*: any*/)
        }
      ]
    },
    operation: {
      kind: "Operation",
      name: "TagsPaginationQuery",
      argumentDefinitions: (v0 /*: any*/),
      selections: [
        {
          kind: "LinkedField",
          alias: null,
          name: "tags",
          storageKey: null,
          args: (v1 /*: any*/),
          concreteType: "TagCursor",
          plural: false,
          selections: [
            {
              kind: "LinkedField",
              alias: null,
              name: "edges",
              storageKey: null,
              args: null,
              concreteType: "TagEdge",
              plural: true,
              selections: [
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
                    },
                    {
                      kind: "ScalarField",
                      alias: null,
                      name: "__typename",
                      args: null,
                      storageKey: null
                    }
                  ]
                },
                {
                  kind: "ScalarField",
                  alias: null,
                  name: "cursor",
                  args: null,
                  storageKey: null
                }
              ]
            },
            {
              kind: "LinkedField",
              alias: null,
              name: "pageInfo",
              storageKey: null,
              args: null,
              concreteType: "PageInfo",
              plural: false,
              selections: [
                {
                  kind: "ScalarField",
                  alias: null,
                  name: "startCursor",
                  args: null,
                  storageKey: null
                },
                {
                  kind: "ScalarField",
                  alias: null,
                  name: "endCursor",
                  args: null,
                  storageKey: null
                },
                {
                  kind: "ScalarField",
                  alias: null,
                  name: "hasNextPage",
                  args: null,
                  storageKey: null
                }
              ]
            }
          ]
        },
        {
          kind: "LinkedHandle",
          alias: null,
          name: "tags",
          args: (v1 /*: any*/),
          handle: "connection",
          key: "Query_tags",
          filters: []
        }
      ]
    },
    params: {
      operationKind: "query",
      name: "TagsPaginationQuery",
      id: null,
      text:
        'query TagsPaginationQuery(\n  $first: PositiveInt = 10\n  $after: String = ""\n) {\n  ...TagsView_tags_2HEEH6\n}\n\nfragment TagsView_tags_2HEEH6 on Query {\n  tags(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        name\n        description\n        color\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
      metadata: {
        derivedFrom: "TagsView_tags",
        isRefetchableQuery: true
      }
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '8b67a1c915c35ece250feeec9f9b730b';
module.exports = node;
