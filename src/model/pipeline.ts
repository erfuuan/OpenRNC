import mongoose from 'mongoose';
import moment from 'jalali-moment';

const pipeLineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    // sourceId: { type: mongoose.Types.ObjectId, ref: 'Source', required: true },
    sourceId: { type:String,required: true },

    // destinationIds: [
    //   { type: mongoose.Types.ObjectId, ref: "destination", required: true },
    // ],

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
const Pipeline = mongoose.model('Pipeline', pipeLineSchema);
export default Pipeline;
