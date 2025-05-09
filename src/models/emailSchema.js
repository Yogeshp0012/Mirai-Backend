import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    sent: {
      type: Boolean,
      default: false,
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateSent: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Email = mongoose.model('Email', emailSchema);

export default Email;
