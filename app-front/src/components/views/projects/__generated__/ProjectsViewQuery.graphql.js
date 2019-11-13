/**
 * @flow
 * @relayHash a8681719812ee6db18134575129130e6
 */

/* eslint-disable */

"use strict";

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ProjectsView_projects$ref = any;
export type ProjectsViewQueryVariables = {||};
export type ProjectsViewQueryResponse = {|
  +$fragmentRefs: ProjectsView_projects$ref
|};
export type ProjectsViewQuery = {|
  variables: ProjectsViewQueryVariables,
  response: ProjectsViewQueryResponse,
|};
*/

/*
query ProjectsViewQuery {
  ...ProjectsView_projects
}

fragment ProjectsView_projects on Query {
  projects(first: 10, after: "") {
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
      name: "ProjectsViewQuery",
      type: "Query",
      metadata: null,
      argumentDefinitions: [],
      selections: [
        {
          kind: "FragmentSpread",
          name: "ProjectsView_projects",
          args: null
        }
      ]
    },
    operation: {
      kind: "Operation",
      name: "ProjectsViewQuery",
      argumentDefinitions: [],
      selections: [
        {
          kind: "LinkedField",
          alias: null,
          name: "projects",
          storageKey: 'projects(after:"",first:10)',
          args: (v0 /*: any*/),
          concreteType: "ProjectCursor",
          plural: false,
          selections: [
            {
              kind: "LinkedField",
              alias: null,
              name: "edges",
              storageKey: null,
              args: null,
              concreteType: "ProjectEdge",
              plural: true,
              selections: [
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
          name: "projects",
          args: (v0 /*: any*/),
          handle: "connection",
          key: "Query_projects",
          filters: []
        }
      ]
    },
    params: {
      operationKind: "query",
      name: "ProjectsViewQuery",
      id: null,
      text:
        'query ProjectsViewQuery {\n  ...ProjectsView_projects\n}\n\nfragment ProjectsView_projects on Query {\n  projects(first: 10, after: "") {\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'fefb19addae918713c0905aa976a1bc9';
module.exports = node;
