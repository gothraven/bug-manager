import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { omitBy, isNil } from 'lodash';
import Issue from './issue.model';
import APIError from '../utils/APIError';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    color: {
      type: String,
      match: /^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/,
      required: true
    }
  },
  {
    timestamps: true
  }
);

tagSchema.post('remove', async function remove(_, next) {
  try {
    await Issue.updateMany({ tagIds: this.id }, { $pull: { tagIds: this.id } });
    return next();
  } catch (error) {
    return next(error);
  }
});

tagSchema.method({
  /**
   * @deprecated Since version 1.0.
   */
  transform() {
    const transformed = {};
    const fields = ['id', 'createdAt', 'updatedAt', 'name', 'description', 'color'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

tagSchema.statics = {
  /**
   * @deprecated Since version 1.0.
   */
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
  /**
   * @deprecated Since version 1.0.
   */
  list({ page = 1, perPage = 30, name, description, color }) {
    const options = omitBy({ name, description, color }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

module.exports = mongoose.model('Tag', tagSchema);
