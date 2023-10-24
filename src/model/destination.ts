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

    credential: Object,






    // credential: {
    //   address: String,
    //   port: String,
    //   password:String,
    //   dbName:String,
    //   topic: String,
    //   headers: Object,
    //   params: Object,
    //   payload: Object,
    //   method:String
    //   // required:true
    // },
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
