import mongoose from 'mongoose';

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

module.exports = mongoose.model('Status', statusSchema);
