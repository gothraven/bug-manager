/**
 * @flow
 * @relayHash cd3dbef2ba26c9f6df30109fbe244c9a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ProjectsView_projects$ref = any;
type TagsView_tags$ref = any;
export type MainLayoutViewQueryVariables = {||};
export type MainLayoutViewQueryResponse = {|
  +$fragmentRefs: ProjectsView_projects$ref & TagsView_tags$ref
|};
export type MainLayoutViewQuery = {|
  variables: MainLayoutViewQueryVariables,
  response: MainLayoutViewQueryResponse,
|};
*/


/*
query MainLayoutViewQuery {
  ...ProjectsView_projects
  ...TagsView_tags
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

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
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
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v6 = {
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MainLayoutViewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ProjectsView_projects",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "TagsView_tags",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MainLayoutViewQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "projects",
        "storageKey": "projects(after:\"\",first:10)",
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ]
              },
              (v5/*: any*/)
            ]
          },
          (v6/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "projects",
        "args": (v0/*: any*/),
        "handle": "connection",
        "key": "Query_projects",
        "filters": []
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(after:\"\",first:10)",
        "args": (v0/*: any*/),
        "concreteType": "TagCursor",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "TagEdge",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Tag",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "color",
                    "args": null,
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ]
              },
              (v5/*: any*/)
            ]
          },
          (v6/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "tags",
        "args": (v0/*: any*/),
        "handle": "connection",
        "key": "Query_tags",
        "filters": []
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MainLayoutViewQuery",
    "id": null,
    "text": "query MainLayoutViewQuery {\n  ...ProjectsView_projects\n  ...TagsView_tags\n}\n\nfragment ProjectsView_projects on Query {\n  projects(first: 10, after: \"\") {\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment TagsView_tags on Query {\n  tags(first: 10, after: \"\") {\n    edges {\n      node {\n        id\n        name\n        description\n        color\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '20e76e2dbabc33ac14d862cb5c6343a1';
module.exports = node;
