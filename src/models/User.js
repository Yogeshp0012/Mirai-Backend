import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
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
    favorites: [{ type: Schema.ObjectId, ref: 'rooms' }],
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
