import mongoose from "mongoose";

const DownloadRequestSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const DownloadRequest =
  mongoose.models.DownloadRequest ||
  mongoose.model("DownloadRequest", DownloadRequestSchema);

export default DownloadRequest;
