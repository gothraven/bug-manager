/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SideBar_me$ref: FragmentReference;
declare export opaque type SideBar_me$fragmentType: SideBar_me$ref;
export type SideBar_me = {|
  +me: ?{|
    +id: string,
    +name: string,
  |},
  +$refType: SideBar_me$ref,
|};
export type SideBar_me$data = SideBar_me;
export type SideBar_me$key = {
  +$data?: SideBar_me$data,
  +$fragmentRefs: SideBar_me$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SideBar_me",
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'dc8d7b3531ce6f25363e6a02f6b917d4';
module.exports = node;
