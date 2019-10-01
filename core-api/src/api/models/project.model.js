const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String
  },
  {
    timestamps: true
  }
);

projectSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title', 'description', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model('Project', projectSchema);
