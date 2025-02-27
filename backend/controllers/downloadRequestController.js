import DownloadRequest from "../models/DownloadRequest.js";

// Create a new download request
const createDownloadRequest = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const downloadRequest = new DownloadRequest({
      bookId,
      userId,
    });

    await downloadRequest.save();

    res.status(201).json({
      success: true,
      message: "Book download request created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Accept a download request
const acceptDownloadRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const downloadRequest = await DownloadRequest.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );

    if (!downloadRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Book download request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book download request accepted",
      downloadRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Reject a download request
const rejectDownloadRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const downloadRequest = await DownloadRequest.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!downloadRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Book download request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book download request rejected",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Get all download requests
const getAllDownloadRequest = async (req, res) => {
  try {
    const downloadRequests = await DownloadRequest.find()
      .populate("bookId")
      .populate("userId");
    res.status(200).json({
      success: true,
      message: "Book download requests retrieved",
      downloadRequests,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Get all download requests by user id
const getAllDownloadRequestByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const downloadRequests = await DownloadRequest.find({ userId })
      .populate("bookId")
      .populate("userId");
    res.status(200).json({
      success: true,
      message: "Book download requests retrieved by user id",
      downloadRequests,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

export {
  createDownloadRequest,
  acceptDownloadRequest,
  rejectDownloadRequest,
  getAllDownloadRequest,
  getAllDownloadRequestByUserId,
};
