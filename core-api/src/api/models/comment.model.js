const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const commentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

commentSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'userId', 'issueId', 'content'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

commentSchema.statics = {
  async get(id) {
    try {
      let comment;

      if (mongoose.Types.ObjectId.isValid(id)) {
        comment = await this.findById(id).exec();
      }
      if (comment) {
        return comment;
      }

      throw new APIError({
        message: 'Comment does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  }
};

module.exports = mongoose.model('Comment', commentSchema);
