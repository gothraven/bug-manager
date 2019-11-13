/**
 * @flow
 */

/* eslint-disable */

"use strict";

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProjectsView_projects$ref: FragmentReference;
declare export opaque type ProjectsView_projects$fragmentType: ProjectsView_projects$ref;
export type ProjectsView_projects = {|
  +projects: ?{|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
        +description: ?string,
      |}
    |}>
  |},
  +$refType: ProjectsView_projects$ref,
|};
export type ProjectsView_projects$data = ProjectsView_projects;
export type ProjectsView_projects$key = {
  +$data?: ProjectsView_projects$data,
  +$fragmentRefs: ProjectsView_projects$ref,
};
*/

const node /*: ReaderFragment*/ = (function() {
  var v0 = ["projects"];
  return {
    kind: "Fragment",
    name: "ProjectsView_projects",
    type: "Query",
    metadata: {
      connection: [
        {
          count: "first",
          cursor: "after",
          direction: "forward",
          path: (v0 /*: any*/)
        }
      ],
      refetch: {
        connection: {
          forward: {
            count: "first",
            cursor: "after"
          },
          backward: null,
          path: (v0 /*: any*/)
        },
        operation: require("./ProjectsPaginationQuery.graphql.js"),
        fragmentPathInResult: []
      }
    },
    argumentDefinitions: [
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
    selections: [
      {
        kind: "LinkedField",
        alias: "projects",
        name: "__Query_projects_connection",
        storageKey: null,
        args: null,
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
      }
    ]
  };
})();
// prettier-ignore
(node/*: any*/).hash = '1926d6a2e9bf9f2f606ceac2498a5a34';
module.exports = node;
