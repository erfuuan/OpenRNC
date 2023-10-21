import mongoose from "mongoose";
import moment from "jalali-moment";

const sourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, required: true },
    description: String,
    sourceToken: { type: String, required: true },
    sourceLicence: { type: String, required: true },
    block: { type: Boolean, default: false },
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
const Source = mongoose.model("Source", sourceSchema);
export default Source;
