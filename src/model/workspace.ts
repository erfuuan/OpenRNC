import mongoose from 'mongoose';
import moment from 'jalali-moment';

const workspaceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    destinationIds: [{ type: String, required: true }],
    createdAt: {
      type: Number,
      required: true,
      default: moment(new Date()).format('X'),
    },
    updatedAt: Number,
    deletedAt: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);
const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;
