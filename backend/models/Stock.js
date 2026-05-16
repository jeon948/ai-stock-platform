import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
      index: true,
    },

    data: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Stock", stockSchema);