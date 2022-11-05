import express from 'express';
import {registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  superLoginUser,
  registerAdmin,
  followUser,
  friendRequest,
  acceptRequest,
  deleteRequest,
  getSearchedUser,
  unfriendUser,
  userImage,
  pinCode} from "../controller/userController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser); //working

router.route("/auth/:token").put(pinCode);//working

router.route("/login").post(loginUser); //working

router.route("/password/forgot").post(forgotPassword); //working

router.route("/password/reset/:token").put(resetPassword);//working

router.route("/logout").get(logout); //working

router.route("/me").get(isAuthenticatedUser, getUserDetails); //working

router.route("/search").post(isAuthenticatedUser, getSearchedUser); //working

router.route("/password/update").put(isAuthenticatedUser, updatePassword); //working

router.route("/me/update").put(isAuthenticatedUser, updateProfile); //working

router.route("/createAdmin").post(isAuthenticatedUser, registerAdmin); //working

router.route("/uploadImage").post(isAuthenticatedUser, userImage); //working

router.route("/super-login")
.post(isAuthenticatedUser, authorizeRoles("superAdmin"), superLoginUser); //working

router
  .route("/users")
  .get(
    isAuthenticatedUser, 
    getAllUser); //working

router
  .route("/user/:id")
  .get(isAuthenticatedUser, getSingleUser) //working
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole) //working
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser); //working

  router.route("/follow/:id").get(isAuthenticatedUser, followUser);

  router.route("/request/:id").get(isAuthenticatedUser, friendRequest);

  router.route("/unfriend/:id").get(isAuthenticatedUser, unfriendUser);

  router.route("/friend/:id").get(isAuthenticatedUser, acceptRequest);

  router.route("/delete/:id").delete(isAuthenticatedUser, deleteRequest);

export default router;
