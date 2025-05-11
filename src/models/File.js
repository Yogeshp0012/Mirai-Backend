import mongoose from 'mongoose';

const { Schema } = mongoose;

const FileSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const File = mongoose.model('File', FileSchema);
export default File;
