const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

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

tagSchema.statics = {
  async get(id) {
    try {
      let tag;

      if (mongoose.Types.ObjectId.isValid(id)) {
        tag = await this.findById(id).exec();
      }
      if (tag) {
        return tag;
      }

      throw new APIError({
        message: 'Tag does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  list() {
    return this.find()
      .all()
      .exec();
  }
};

module.exports = mongoose.model('Tag', tagSchema);
