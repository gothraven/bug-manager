const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

const projectSchema = new mongoose.Schema(
  {
    name: {
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
    const fields = ['id', 'name', 'description', 'createdAt', 'updatedAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

projectSchema.statics = {
  async get(id) {
    try {
      let project;

      if (mongoose.Types.ObjectId.isValid(id)) {
        project = await this.findById(id).exec();
      }
      if (project) {
        return project;
      }

      throw new APIError({
        message: 'Project does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  list({ page = 1, perPage = 30, name, description }) {
    const options = omitBy({ name, description }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

module.exports = mongoose.model('Project', projectSchema);
