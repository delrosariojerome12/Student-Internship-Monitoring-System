const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/interns");

router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
