import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: { type: Schema.ObjectId, ref: 'users' },
  content: String,
  type: String,
  file: { type: Schema.ObjectId, ref: 'files' },
  room: { type: Schema.ObjectId, ref: 'rooms' },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('messages', MessageSchema);

export default Message;
