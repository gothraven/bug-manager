import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { omitBy, isNil } from 'lodash';
import bcrypt from 'bcryptjs';
import moment from 'moment-timezone';
import jwt from 'jwt-simple';
import Issue from './issue.model';
import Comment from './comment.model';
import APIError from '../utils/APIError';
import { env, jwtSecret, jwtExpirationInterval } from '../../config/vars';

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
  /**
   * @deprecated Since version 1.0.
   */
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
  /**
   * @deprecated Since version 1.0.
   */
  token() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, 'minutes')
        .unix(),
      iat: moment().unix(),
      sub: this._id
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});

userSchema.statics = {
  roles,
  /**
   * @deprecated Since version 1.0.
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * @deprecated Since version 1.0.
   */
  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
  /**
   * @deprecated Since version 1.0.
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    };
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * @deprecated Since version 1.0.
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists']
          }
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  }
};

export default mongoose.model('User', userSchema);
