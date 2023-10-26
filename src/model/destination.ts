import mongoose from 'mongoose';
import moment from 'jalali-moment';

const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: {
      type: String,
      required: true,
      enum: ['redis', 'kafka', 'webHook', 'mysql','mongo'],
    },
    description: String,
    workspaceId: { type:String ,required: true },
    // workspaceId: { type: mongoose.Types.ObjectId, ref: 'workspace', required: true },
    credential: {
      address: String,
      port: String,
      password:String,
      dbName:String,
      topic: String,
      url:String,
      headers: Object,
      params: Object,
      payload: Object,
      method:String
      // required:true
    },
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
const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
