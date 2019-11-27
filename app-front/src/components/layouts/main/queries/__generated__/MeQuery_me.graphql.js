/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type Role = "ADMIN" | "USER" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type MeQuery_me$ref: FragmentReference;
declare export opaque type MeQuery_me$fragmentType: MeQuery_me$ref;
export type MeQuery_me = {|
  +me: ?{|
    +id: string,
    +name: string,
    +role: Role,
    +email: any,
  |},
  +$refType: MeQuery_me$ref,
|};
export type MeQuery_me$data = MeQuery_me;
export type MeQuery_me$key = {
  +$data?: MeQuery_me$data,
  +$fragmentRefs: MeQuery_me$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "MeQuery_me",
  "type": "Query",
  "metadata": null,
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
          "name": "role",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '3c184c08f91082162e0ec8ae956fadce';
module.exports = node;
