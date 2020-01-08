import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Issue from './issue.model';
import Comment from './comment.model';
import { env } from '../../config/vars';

export const ADMIN = 'ADMIN';
export const DEVELOPER = 'DEVELOPER';
export const USER = 'USER';
const roles = [ADMIN, DEVELOPER, USER];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true
    },
    role: {
      type: String,
      enum: roles,
      default: USER
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'development' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post('remove', async function remove(_, next) {
  try {
    await Issue.deleteMany({ creatorId: this.id });
    await Comment.deleteMany({ creatorId: this.id });
    await Issue.updateMany({ assignedUserIds: this.id }, { $pull: { assignedUserIds: this.id } });
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});

userSchema.statics = { roles };

export default mongoose.model('User', userSchema);
