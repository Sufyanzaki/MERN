import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  pic: {
    type: String,
    required: true,
    default: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
  },
  role: {
    type: String,
    default: "user",
  },
  notifications: [
    {
      user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      action: {
        type:String,
        required : true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
  ,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recievedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: 'Boolean',
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailConfirmationToken: String,
  emailConfirmationExpire: Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// Generatin confirmation Token
userSchema.methods.getEmailConfirmationToken = function () {
  // Generating Token
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  this.emailConfirmationToken = crypto
    .createHash("sha256")
    .update(confirmationToken)
    .digest("hex");

  this.emailConfirmationExpire = Date.now() + 15 * 60 * 1000;

  return confirmationToken;
};

export default mongoose.model("User", userSchema);