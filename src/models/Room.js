import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoomSchema = new Schema({
  people: [{ type: Schema.ObjectId, ref: 'users' }],
  title: String,
  picture: { type: Schema.ObjectId, ref: 'images' },
  isGroup: { type: Boolean, default: false },
  lastUpdate: Date,
  lastAuthor: { type: Schema.ObjectId, ref: 'users' },
  lastMessage: { type: Schema.ObjectId, ref: 'messages' },
});

const Room = mongoose.model('rooms', RoomSchema);

export default Room;
