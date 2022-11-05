import { Server } from "socket.io";
import http from "http";
import app from "./app.js"
import connectDatabase from "./config/database.js";
import dotenv from 'dotenv'
import * as path from 'path';
import TransmissionRoutes from "./routes/transmissionRoutes.js";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config.env" })
}

// Connecting to database
connectDatabase();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    pingTimeout: 60000,
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", TransmissionRoutes)

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

const server = httpServer.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
