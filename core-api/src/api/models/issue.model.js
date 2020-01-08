import mongoose from 'mongoose';
import Comment from './comment.model';
import Change from './change.model';

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
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

issueSchema.post('remove', async function remove(_, next) {
  try {
    Comment.remove({ issueId: this.id });
    Change.remove({ issueId: this.id });
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('Issue', issueSchema);
