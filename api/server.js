const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const userRouter = require("../users/users-router");
const authRouter = require("../authentication/auth-router");
const { restricted } = require("../users/users-middleware");
const server = express();

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60, // one hour in milliseconds
    secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
    httpOnly: true, // true means client JS cannot access the cookie
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
  name: "monster",
  secret: process.env.COOKIE_SECRET || "keepitsecret,keepitsafe!",
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, userRouter);

server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up and running" });
});

module.exports = server;
