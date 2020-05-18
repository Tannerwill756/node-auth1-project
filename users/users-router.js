const router = require("express").Router();

// const { restricted } = require("./users-middleware");
const Users = require("./users-model");

// router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
