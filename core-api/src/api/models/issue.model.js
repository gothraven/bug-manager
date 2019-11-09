import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status'
    },
    assignedUserIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    tagIds: [
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

module.exports = mongoose.model('Issue', issueSchema);
