import mongoose from 'mongoose';

const types = [
  'assignUser',
  'unassignUser',
  'addTag',
  'removeTag',
  'changeStatus',
  'changeProject',
  'changeTitle',
  'changeContent'
];

const changeSchema = new mongoose.Schema(
  {
    userId: {
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

module.exports = mongoose.model('Change', changeSchema);
