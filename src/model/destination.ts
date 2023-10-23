import mongoose from "mongoose";
import moment from "jalali-moment";

const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: {
      type: String,
      required: true,
      enum: ["redis", "kafka", "webhook", "mysql"],
    },
    description: String,
    credential: {
      address: String,
      port: String,
      topic: String,
    },
    createdAt: {
      type: Number,
      required: true,
      default: moment(new Date()).format("X"),
    },
    updatedAt: Number,
    deletedAt: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);
const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
