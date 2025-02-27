import express from "express";
import {
  createDownloadRequest,
  acceptDownloadRequest,
  rejectDownloadRequest,
  getAllDownloadRequest,
  getAllDownloadRequestByUserId,
} from "../controllers/downloadRequestController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-download-request", authMiddleware, createDownloadRequest);
router.put(
  "/accept-download-request/:id",
  authMiddleware,
  adminMiddleware,
  acceptDownloadRequest
);
router.put(
  "/reject-download-request/:id",
  authMiddleware,
  adminMiddleware,
  rejectDownloadRequest
);
router.get(
  "/get-all-download-requests",
  authMiddleware,
  adminMiddleware,
  getAllDownloadRequest
);
router.get(
  "/get-all-download-requests-by-user",
  authMiddleware,
  getAllDownloadRequestByUserId
);

export default router;
