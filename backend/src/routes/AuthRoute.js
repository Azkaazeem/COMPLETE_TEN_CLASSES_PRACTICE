import express from "express";
import multer from "multer";
import {
  addUser,
  allUsers,
  deleteUser,
  getUser,
  loginUser,
  logout,
  updateUser,
  UserProfile,
} from "../controllers/AuthControllers.js";
import { requireAuth } from "../middlewares/auth.js";

const authroute = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

authroute.post("/signup", upload.single("profilePic"), addUser);
authroute.post("/login", loginUser);
authroute.post("/logout", logout);
authroute.get("/profile", requireAuth, UserProfile);
authroute.get("/users", allUsers);
authroute.get("/users/:id", getUser);
authroute.put("/users/:id", upload.single("profilePic"), updateUser);
authroute.delete("/users/:id", deleteUser);

export default authroute;
