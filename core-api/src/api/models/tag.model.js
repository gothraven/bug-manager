import mongoose from 'mongoose';
import Issue from './issue.model';

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

module.exports = mongoose.model('Tag', tagSchema);
