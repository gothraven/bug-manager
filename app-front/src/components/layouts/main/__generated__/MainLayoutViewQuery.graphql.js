/**
 * @flow
 * @relayHash cccdb21c93ea8c438b805aac5d52bdbe
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DashboardView_issues$ref = any;
type ProjectsView_projects$ref = any;
type SideBar_me$ref = any;
type TagsView_tags$ref = any;
export type MainLayoutViewQueryVariables = {||};
export type MainLayoutViewQueryResponse = {|
  +$fragmentRefs: SideBar_me$ref & DashboardView_issues$ref & ProjectsView_projects$ref & TagsView_tags$ref
|};
export type MainLayoutViewQuery = {|
  variables: MainLayoutViewQueryVariables,
  response: MainLayoutViewQueryResponse,
|};
*/


/*
query MainLayoutViewQuery {
  ...SideBar_me
  ...DashboardView_issues
  ...ProjectsView_projects
  ...TagsView_tags
}

fragment DashboardView_issues on Query {
  issues(first: 10, after: "") {
    edges {
      node {
        id
        createdAt
        updatedAt
        title
        creator {
          id
          name
        }
        status {
          id
          name
        }
        open
        assignedUsers {
          id
          name
        }
        tags {
          id
          name
          color
        }
        project {
          name
          id
        }
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

fragment SideBar_me on Query {
  me {
    id
    name
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
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
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "color",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v7 = {
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
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
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
        "name": "SideBar_me",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "DashboardView_issues",
        "args": null
      },
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
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": (v2/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "issues",
        "storageKey": "issues(after:\"\",first:10)",
        "args": (v3/*: any*/),
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
                  (v0/*: any*/),
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
                    "selections": (v2/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "status",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Status",
                    "plural": false,
                    "selections": (v2/*: any*/)
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
                    "selections": (v2/*: any*/)
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
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v4/*: any*/)
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
                      (v1/*: any*/),
                      (v0/*: any*/)
                    ]
                  },
                  (v5/*: any*/)
                ]
              },
              (v6/*: any*/)
            ]
          },
          (v7/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "issues",
        "args": (v3/*: any*/),
        "handle": "connection",
        "key": "Query_issues",
        "filters": []
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "projects",
        "storageKey": "projects(after:\"\",first:10)",
        "args": (v3/*: any*/),
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v8/*: any*/),
                  (v5/*: any*/)
                ]
              },
              (v6/*: any*/)
            ]
          },
          (v7/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "projects",
        "args": (v3/*: any*/),
        "handle": "connection",
        "key": "Query_projects",
        "filters": []
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tags",
        "storageKey": "tags(after:\"\",first:10)",
        "args": (v3/*: any*/),
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v8/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ]
              },
              (v6/*: any*/)
            ]
          },
          (v7/*: any*/)
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "tags",
        "args": (v3/*: any*/),
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
    "text": "query MainLayoutViewQuery {\n  ...SideBar_me\n  ...DashboardView_issues\n  ...ProjectsView_projects\n  ...TagsView_tags\n}\n\nfragment DashboardView_issues on Query {\n  issues(first: 10, after: \"\") {\n    edges {\n      node {\n        id\n        createdAt\n        updatedAt\n        title\n        creator {\n          id\n          name\n        }\n        status {\n          id\n          name\n        }\n        open\n        assignedUsers {\n          id\n          name\n        }\n        tags {\n          id\n          name\n          color\n        }\n        project {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ProjectsView_projects on Query {\n  projects(first: 10, after: \"\") {\n    edges {\n      node {\n        id\n        name\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SideBar_me on Query {\n  me {\n    id\n    name\n  }\n}\n\nfragment TagsView_tags on Query {\n  tags(first: 10, after: \"\") {\n    edges {\n      node {\n        id\n        name\n        description\n        color\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '41f1f895dbc44c11ef8ca67c631c0b48';
module.exports = node;
