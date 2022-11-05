import express from "express";
import {
    accessChat, fetchChats, createGroupChat, renameGroup, addToGroup,removeFromGroup
} from "../controller/chatController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/message").post(isAuthenticatedUser, accessChat); //working

router.route("/fetchchats").get(isAuthenticatedUser, fetchChats); //working

router.route("/creategroup").post(isAuthenticatedUser, createGroupChat); //working

router.route("/renamegroup").put(isAuthenticatedUser, renameGroup); //working

router.route("/addtogroup").put(isAuthenticatedUser, addToGroup); //working

router.route("/removefromgroup").put(isAuthenticatedUser, removeFromGroup); //working

export default router;
