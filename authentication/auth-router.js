const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password that is a string",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          req.session.loggedIn = true;
          req.session.user = user;

          res.status(200).json({ message: "Welcome to my API" });
        } else {
          res.status(200).json({ message: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password that is a string",
    });
  }
});

module.exports = router;
