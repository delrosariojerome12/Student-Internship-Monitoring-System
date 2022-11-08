const express = require("express");

const router = express.Router();
const { updateUser } = require("../controllers/interns");

router.route("/:id").patch(updateUser);

module.exports = router;
