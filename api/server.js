const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const userRouter = require("../users/users-router");
const authRouter = require("../authentication/auth-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
});

module.exports = server;
