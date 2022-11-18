import ErrorHandler from "../utils/errorhander.js";
import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from 'cloudinary'

// Register a User
export const registerUser = (async (req, res, next) => {
  const { name, email, password} = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "123",
      url: "url",
    },
  });

  const emailConfirmationToken = user.getEmailConfirmationToken();
  const emailConfirmationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/${emailConfirmationToken}`;

  const message = `Your confirmation token is :- \n\n ${emailConfirmationURL} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    sendEmail({
      email: user.email,
      subject: `EMAIL VERIFICATION`,
      message,
    });

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    user.emailConfirmationToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

export const userImage= (async(req, res, next)=>{
  console.log(req.files)
  const user=await User.findById(req.user._id)
  const file = req.files.file;
  await cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
    user.pic = result.url
  });
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: user,
  });
})

export const pinCode = (async (req, res, next) => {
  // creating token hash
  const confirmationToken = req.params.token;

  const user = await User.findOne({
    emailConfirmationToken: confirmationToken,
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "COnfirmation Token is invalid or has been expired",
        400
      )
    );
  }

  user.emailConfirmationToken = undefined;
  user.emailConfirmationExpire = undefined;
  user.confirmed = true;

  await user.save();

  sendToken(user, 200, res);
});

// Login User
export const loginUser = (async (req, res, next) => {

  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user.confirmed) {
    return next(new ErrorHandler("Please verify your email first", 400));
  }

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
export const logout = (async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
export const forgotPassword = (async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `http://localhost:3000/password/change/${resetToken}`

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: `Password Recovery`,
    //   message,
    // });

    res.status(200).json({
      success: true,
      message: message,
      users:user
    });
  } catch (error) {
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
export const resetPassword = (async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
export const getUserDetails = (async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
export const updatePassword = (async (req, res, next) => {
  console.log(req.body)
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
export const updateProfile = (async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

// Get all users(admin)
export const getAllUser = (async (req, res, next) => {
  const users = await User.find({ _id: { $nin: req.user._id } } );

  res.status(200).json({
    success: true,
    users,
  });
});


export const getSearchedUser = (async (req, res, next) => {
  const regex = new RegExp(req.body.name, 'i')
  let user = await User.find({ name: regex })
  if (user.length === 0) {
    user = null
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Get single user (admin)
export const getSingleUser = (async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("friends");

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
export const updateUserRole = (async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
export const deleteUser = (async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// the super admin
export const superLoginUser = (async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//creating admins with s. admin panel
export const registerAdmin = (async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role: 'admin',
    avatar: {
      public_id: "123",
      url: "url",
    },
  });

  sendToken(user, 201, res);
});

export const followUser = (async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: loggedInUser,
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: loggedInUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const friendRequest = (async (req, res, next) => {
  try {
    const userToRequest = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToRequest) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //if the friend request already sended
    if (loggedInUser.sentRequests.includes(userToRequest._id)) {
      const indexSent = loggedInUser.sentRequests.indexOf(userToRequest._id);
      const indexRecieved = userToRequest.recievedRequests.indexOf(loggedInUser._id);

      loggedInUser.sentRequests.splice(indexSent, 1);
      userToRequest.recievedRequests.splice(indexRecieved, 1);

      await loggedInUser.save();
      await userToRequest.save();

      res.status(200).json({
        success: true,
        user: loggedInUser,
      });
    }
    //if sending request for the first time
    else {
      loggedInUser.sentRequests.push(userToRequest._id);
      loggedInUser.following.push(userToRequest._id);
      userToRequest.recievedRequests.push(loggedInUser._id);

      await loggedInUser.save();
      await userToRequest.save();

      res.status(200).json({
        success: true,
        user: loggedInUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const acceptRequest = (async (req, res, next) => {

  const requestId = req.params.id;
  const loggedInUser = await User.findById(req.user._id);
  const targetUser = await User.findById(requestId)

  loggedInUser.friends.push(requestId);
  targetUser.friends.push(req.user._id)
  loggedInUser.followers.push(requestId);

  const indexRecieved = loggedInUser.recievedRequests.indexOf(requestId);
  if (indexRecieved === -1) {
    return next(new ErrorHandler("You are not authorized to perform this action", 500));
  }
  loggedInUser.recievedRequests.splice(indexRecieved, 1);

  const targetUserSent = targetUser.sentRequests.indexOf(req.user._id);
  if (targetUserSent === -1) {
    return next(new ErrorHandler("You are not authorized to perform this action", 500));
  }
  targetUser.sentRequests.splice(targetUserSent, 1);

  await loggedInUser.save();
  await targetUser.save();

  res.status(200).json({
    success: true,
    user: loggedInUser
  });
})

export const unfriendUser = (async (req, res, next) => {

  const requestId = req.params.id;
  const loggedInUser = await User.findById(req.user._id);

  const indexRecieved = loggedInUser.friends.indexOf(requestId);
  if (indexRecieved === -1) {
    return next(new ErrorHandler("You are not authorized to perform this action", 500));
  }
  loggedInUser.friends.splice(indexRecieved, 1);

  await loggedInUser.save();

  res.status(200).json({
    success: true,
    user: loggedInUser
  });
})

export const deleteRequest = (async (req, res, next) => {

  const loggedInUser = await User.findById(req.user._id);
  const requestId = req.params.id;

  const indexRecieved = loggedInUser.recievedRequests.indexOf(requestId);
  if (indexRecieved === -1) {
    return next(new ErrorHandler("You are not authorized to perform this action", 500));
  }

  loggedInUser.recievedRequests.splice(indexRecieved, 1);

  await loggedInUser.save();

  res.status(200).json({
    success: true,
    message: "friend Request Cancelled",
  });
})