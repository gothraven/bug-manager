/**
 * @flow
 * @relayHash fbde476f3853df5bc1e5a62da4de13c8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChangeType = "ADD_TAG" | "ASSIGN_USER" | "ATTACH_TO_PROJECT" | "CHANGE_STATUS" | "CLOSE_ISSUE" | "DETATCH_FROM_PROJECT" | "REMOVE_TAG" | "REOPEN_ISSUE" | "UNASSIGN_USER" | "%future added value";
export type IssuePageQueryVariables = {|
  id: string
|};
export type IssuePageQueryResponse = {|
  +issue: {|
    +id: string,
    +title: string,
    +createdAt: any,
    +updatedAt: any,
    +creator: {|
      +id: string,
      +name: string,
    |},
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
      +id: string,
      +name: string,
    |},
    +changes: $ReadOnlyArray<{|
      +id: string,
      +createdAt: any,
      +updatedAt: any,
      +creator: {|
        +id: string,
        +name: string,
      |},
      +type: ChangeType,
      +data: {|
        +user: ?{|
          +name: string
        |},
        +tag: ?{|
          +name: string
        |},
        +project: ?{|
          +name: string
        |},
        +status: ?{|
          +name: string
        |},
      |},
    |}>,
    +comments: $ReadOnlyArray<{|
      +id: string,
      +createdAt: any,
      +updatedAt: any,
      +content: string,
      +creator: {|
        +id: string,
        +name: string,
      |},
    |}>,
  |}
|};
export type IssuePageQuery = {|
  variables: IssuePageQueryVariables,
  response: IssuePageQueryResponse,
|};
*/


/*
query IssuePageQuery(
  $id: ID!
) {
  issue(id: $id) {
    id
    title
    createdAt
    updatedAt
    creator {
      id
      name
    }
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
      id
      name
    }
    changes {
      id
      createdAt
      updatedAt
      creator {
        id
        name
      }
      type
      data {
        user {
          name
          id
        }
        tag {
          name
          id
        }
        project {
          name
          id
        }
        status {
          name
          id
        }
      }
    }
    comments {
      id
      createdAt
      updatedAt
      content
      creator {
        id
        name
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "updatedAt",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creator",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v7/*: any*/)
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "assignedUsers",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": true,
  "selections": (v7/*: any*/)
},
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "tags",
  "storageKey": null,
  "args": null,
  "concreteType": "Tag",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "color",
      "args": null,
      "storageKey": null
    }
  ]
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "project",
  "storageKey": null,
  "args": null,
  "concreteType": "Project",
  "plural": false,
  "selections": (v7/*: any*/)
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v13 = [
  (v6/*: any*/)
],
v14 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "comments",
  "storageKey": null,
  "args": null,
  "concreteType": "Comment",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "content",
      "args": null,
      "storageKey": null
    },
    (v8/*: any*/)
  ]
},
v15 = [
  (v6/*: any*/),
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "IssuePageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "issue",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Issue",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "changes",
            "storageKey": null,
            "args": null,
            "concreteType": "Change",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              (v12/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": "ChangeData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "user",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "tag",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Tag",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "project",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Project",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "status",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Status",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  }
                ]
              }
            ]
          },
          (v14/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "IssuePageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "issue",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Issue",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "changes",
            "storageKey": null,
            "args": null,
            "concreteType": "Change",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              (v12/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": "ChangeData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "user",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": (v15/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "tag",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Tag",
                    "plural": false,
                    "selections": (v15/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "project",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Project",
                    "plural": false,
                    "selections": (v15/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "status",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Status",
                    "plural": false,
                    "selections": (v15/*: any*/)
                  }
                ]
              }
            ]
          },
          (v14/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "IssuePageQuery",
    "id": null,
    "text": "query IssuePageQuery(\n  $id: ID!\n) {\n  issue(id: $id) {\n    id\n    title\n    createdAt\n    updatedAt\n    creator {\n      id\n      name\n    }\n    assignedUsers {\n      id\n      name\n    }\n    tags {\n      id\n      name\n      color\n    }\n    project {\n      id\n      name\n    }\n    changes {\n      id\n      createdAt\n      updatedAt\n      creator {\n        id\n        name\n      }\n      type\n      data {\n        user {\n          name\n          id\n        }\n        tag {\n          name\n          id\n        }\n        project {\n          name\n          id\n        }\n        status {\n          name\n          id\n        }\n      }\n    }\n    comments {\n      id\n      createdAt\n      updatedAt\n      content\n      creator {\n        id\n        name\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2ded9b7628708ed81081440fb6105a53';
module.exports = node;
