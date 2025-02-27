import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserProfile,
} from "../controllers/authController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/profile", authMiddleware, getUserProfile);

export default router;
