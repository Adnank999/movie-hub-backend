import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { setIo } from "./socket.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ["*"],
    methods: ["GET", "POST"],
    credentials: true,
   
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


server.listen(process.env.PORT, () => {
  console.log(`Server is running on port 5000`);
});

setIo(io);