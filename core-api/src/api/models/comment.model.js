const mongoose = require('mongoose');

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

module.exports = mongoose.model('Comment', commentSchema);
