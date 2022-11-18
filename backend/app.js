import 'express-async-errors';
import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import errorMiddleware from './middleware/error.js'
import { v2 as cloudinary } from 'cloudinary'

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

cloudinary.config({ 
  cloud_name: 'dkfy6dxrg', 
  api_key: '113136512756865', 
  api_secret: 'CvdwBz2znMdv6SOHtf0ciAKpg_8',
  secure: false
});

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Route Imports
import user from "./routes/userRoute.js";
import post from "./routes/postRoute.js"
import message from "./routes/messageRoutes.js"
import chat from "./routes/chatRoutes.js"

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", message);
app.use("/api/v1", chat);

// Middleware for Errors
app.use(errorMiddleware);

export default app;
