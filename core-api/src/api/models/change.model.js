import mongoose from 'mongoose';

export const ASSIGN_USER = 'assignUser';
export const UNASSIGN_USER = 'unassignUser';
export const ADD_TAG = 'addTag';
export const REMOVE_TAG = 'removeTag';
export const CHANGE_STATUS = 'changeStatus';
export const ATTACH_TO_PROJECT = 'attachToProject';
export const DETATCH_FROM_PROJECT = 'detatchFromProject';
export const CLOSE_ISSUE = 'closeIssue';
export const REOPEN_ISSUE = 'reopenIssue';

const types = [
  ASSIGN_USER,
  UNASSIGN_USER,
  ADD_TAG,
  REMOVE_TAG,
  CHANGE_STATUS,
  ATTACH_TO_PROJECT,
  DETATCH_FROM_PROJECT,
  CLOSE_ISSUE,
  REOPEN_ISSUE
];

const changeSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
      required: true
    },
    type: {
      type: String,
      enum: types,
      required: true
    },
    data: Object
  },
  {
    timestamps: true
  }
);

changeSchema.method({
  /**
   * @deprecated Since version 1.0.
   */
  transform() {
    const transformed = {};
    const fields = ['id', 'userId', 'issueId', 'type', 'data'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

export default mongoose.model('Change', changeSchema);
