import express from "express";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import http from "http";
// import errorHandler from './middleware/errorHandler.js';
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
  },
});
io.on("connection", (socket) => {
  console.log("user is connected to socket");
  socket.on("login", (data) => {
    console.log(data.username + " sended from server");
    socket.broadcast.emit("login", data);
    socket.emit("login", data);
  });
});
io.on("disconnect", (socket) => {
  console.log("user disconnected");
});

app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", gameRoutes);

// Error handling middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
