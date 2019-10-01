const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
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

statusSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title', 'description'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model('Status', statusSchema);
