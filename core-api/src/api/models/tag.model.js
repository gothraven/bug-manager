const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    color: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

tagSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'color', 'createdAt', 'updatedAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model('Tag', tagSchema);
