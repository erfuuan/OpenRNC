import mongoose from 'mongoose';
import moment from 'jalali-moment';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // active: { type: Boolean, default: true },
    role: { type: String, default: 'user', required: true },
    createdAt: { type: Number, required: true, default: moment(new Date()).format('X') },
    updatedAt: Number,
    deletedAt: Number,
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
