import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      default: 'free',
    },
    tagLine: {
      type: String,
      default: 'New User',
    },
    pictureId: {
      type: Number,
    },
    lastOnline: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
