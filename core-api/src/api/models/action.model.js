const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

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

actionSchema.statics = {
  list({ issueId, userId, type }) {
    const options = omitBy({ issueId, userId, type }, isNil);
    return this.find(options);
  }
};

module.exports = mongoose.model('Action', actionSchema);
