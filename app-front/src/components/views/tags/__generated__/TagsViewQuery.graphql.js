/**
 * @flow
 * @relayHash c6d10a2221ae78f07690fd84e813561d
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TagsView_tags$ref = any;
export type TagsViewQueryVariables = {||};
export type TagsViewQueryResponse = {|
  +$fragmentRefs: TagsView_tags$ref
|};
export type TagsViewQuery = {|
  variables: TagsViewQueryVariables,
  response: TagsViewQueryResponse,
|};
*/

/*
query TagsViewQuery {
  ...TagsView_tags
}

fragment TagsView_tags on Query {
  tags(first: 10, after: "") {
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
      endCursor
      hasNextPage
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
    {
      kind: "Literal",
      name: "after",
      value: ""
    },
    {
      kind: "Literal",
      name: "first",
      value: 10
    }
  ];
  return {
    kind: "Request",
    fragment: {
      kind: "Fragment",
      name: "TagsViewQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: [],
      selections: [
        {
          kind: "FragmentSpread",
          name: "TagsView_tags",
          args: null
        }
      ]
    },
    operation: {
      kind: "Operation",
      name: "TagsViewQuery",
      argumentDefinitions: [],
      selections: [
        {
          kind: "LinkedField",
          alias: null,
          name: "tags",
          storageKey: 'tags(after:"",first:10)',
          args: (v0 /*: any*/),
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
          args: (v0 /*: any*/),
          handle: "connection",
          key: "Query_tags",
          filters: []
        }
      ]
    },
    params: {
      operationKind: "query",
      name: "TagsViewQuery",
      id: null,
      text:
        'query TagsViewQuery {\n  ...TagsView_tags\n}\n\nfragment TagsView_tags on Query {\n  tags(first: 10, after: "") {\n    edges {\n      node {\n        id\n        name\n        description\n        color\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = '13abf6105e531c4d91e9d6503d132772';
module.exports = node;
