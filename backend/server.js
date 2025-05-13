const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React frontend URL
    methods: ["GET", "POST"],
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (user) => {
    users[user.uid] = socket.id;
    console.log(`${user.username} joined`);
  });

  socket.on("send_message", (data) => {
    const receiverSocket = users[data.to];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", data);
    }
  });

  socket.on("disconnect", () => {
    for (let uid in users) {
      if (users[uid] === socket.id) {
        delete users[uid];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
