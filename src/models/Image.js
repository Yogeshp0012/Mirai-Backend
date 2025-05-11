import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = new mongoose.Schema(
  {
    shield: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    shieldedId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Image = mongoose.model('Image', ImageSchema);

export default Image;
