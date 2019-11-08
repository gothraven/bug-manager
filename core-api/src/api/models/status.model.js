import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../rest/utils/APIError';

const statusSchema = new mongoose.Schema(
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

statusSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'description'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

statusSchema.statics = {
  async get(id) {
    try {
      let status;

      if (mongoose.Types.ObjectId.isValid(id)) {
        status = await this.findById(id).exec();
      }
      if (status) {
        return status;
      }

      throw new APIError({
        message: 'Status does not exist',
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

module.exports = mongoose.model('Status', statusSchema);
