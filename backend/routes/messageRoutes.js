import express from "express";
import { allMessages, sendMessage } from "../controller/messageController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/chats").post(isAuthenticatedUser, allMessages); //working

router.route("/sendmessage").post(isAuthenticatedUser, sendMessage); //working

export default router;
