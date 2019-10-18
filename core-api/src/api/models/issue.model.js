const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    content: String,
    attachments: [
      {
        data: Buffer,
        contentType: String
      }
    ],
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    statuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true
    },
    assignedUserIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    tagsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true
  }
);

issueSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "title",
      "content",
      "creatorId",
      "statusId",
      "assignedUserIds",
      "tagsIds",
      "projectId"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model("Issue", issueSchema);
