const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const home = require('./routes/home');
const pinsert = require('./routes/pinsert');

// Socket event file
const socketHandler = require('./routes/getdata'); 

const app = express();
app.use(cors());
app.use(express.json());

// Normal REST routes
app.use('/', home);
app.use('/', pinsert);

// Create HTTP server from Express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: { origin: "*" } // change to your frontend URL in production
});

// Pass io to the socket handler
socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.IO on port ${PORT}`);
});
