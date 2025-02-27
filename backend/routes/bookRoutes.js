import express from "express";
import {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  likeBook,
  unlikeBook,
} from "../controllers/bookController.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add-book",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addBook
);
router.get("/get-all-books", authMiddleware, getAllBooks);
router.get("/get-book/:id", authMiddleware, getBook);
router.put(
  "/update-book/:id",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateBook
);
router.delete("/delete-book/:id", authMiddleware, adminMiddleware, deleteBook);
router.post("/like-book/:id", authMiddleware, likeBook);
router.post("/unlike-book/:id", authMiddleware, unlikeBook);

export default router;
