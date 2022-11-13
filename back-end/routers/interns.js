const express = require("express");
const router = express.Router();

const { createInfos } = require("../controllers/interns");

router.route("/").post(createInfos);
// router.route("/:email").patch(updateUser);

module.exports = router;
