const mongoose = require('mongoose');

const types = [
  'assignUser',
  'unassignUser',
  'addTag',
  'removeTag',
  'changeStatus',
  'changeProject'
];

const actionSchema = new mongoose.Schema(
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

actionSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'userId', 'issueId', 'type', 'data'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model('Action', actionSchema);
