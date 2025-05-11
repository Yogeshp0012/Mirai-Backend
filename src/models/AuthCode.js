import mongoose from 'mongoose';

const { Schema } = mongoose;

const AuthCodeSchema = new mongoose.Schema(
  {
    expires: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const AuthCode = mongoose.model('AuthCode', AuthCodeSchema);

export default AuthCode;
