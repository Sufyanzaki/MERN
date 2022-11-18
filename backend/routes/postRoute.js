import express from "express";
import {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
  adminDeletePost,
  adminDeleteComment,
  getAllPosts,
  userposts
} from "../controller/postController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/post/upload").post(isAuthenticatedUser, createPost); //working

router.route("/userPosts/:page").post(isAuthenticatedUser, userposts)

router
  .route("/post/:id")
  .get(isAuthenticatedUser, likeAndUnlikePost) //working
  .put(isAuthenticatedUser, updateCaption) //working
  .delete(isAuthenticatedUser, deletePost); //working

router.route("/posts").get(isAuthenticatedUser, getPostOfFollowing); //working

router.route("/allPosts/:page").get(isAuthenticatedUser, getAllPosts); //working

router
  .route("/post/comment/:id")
  .put(isAuthenticatedUser, commentOnPost) //working
  .delete(isAuthenticatedUser, deleteComment); //working

  // admin can delete any post and any comment
  router
  .route("/admin/post/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), adminDeletePost) //working
  router
  .route("/admin/post/comment/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), adminDeleteComment) //working

export default router;