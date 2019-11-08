const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    content: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    statuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status',
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    assignedUserIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tagsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  {
    timestamps: true
  }
);

issueSchema.method({
  /**
   * @deprecated Since version 1.0.
   */
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'title',
      'createdAt',
      'updatedAt',
      'content',
      'creatorId',
      'open',
      'statusId',
      'assignedUserIds',
      'tagsIds',
      'projectId'
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

issueSchema.statics = {
  async get(id) {
    try {
      let issue;

      if (mongoose.Types.ObjectId.isValid(id)) {
        issue = await this.findById(id).exec();
      }
      if (issue) {
        return issue;
      }

      throw new APIError({
        message: 'Issue does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  list({ page = 1, perPage = 30, projectId }) {
    const options = omitBy({ projectId }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

module.exports = mongoose.model('Issue', issueSchema);
