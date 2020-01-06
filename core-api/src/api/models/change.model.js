import mongoose from 'mongoose';

export const ASSIGN_USER = 'ASSIGN_USER';
export const UNASSIGN_USER = 'UNASSIGN_USER';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const ATTACH_TO_PROJECT = 'ATTACH_TO_PROJECT';
export const DETATCH_FROM_PROJECT = 'DETATCH_FROM_PROJECT';
export const CLOSE_ISSUE = 'CLOSE_ISSUE';
export const REOPEN_ISSUE = 'REOPEN_ISSUE';

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
    timestamps: true,
    minimize: false
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
