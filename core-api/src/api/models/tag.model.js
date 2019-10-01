const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    color: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

tagSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'description', 'color'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model('Tag', tagSchema);
