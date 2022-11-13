const express = require("express");
const router = express.Router();

const { updateInfos } = require("../controllers/interns");

router.route("/:email").patch(updateInfos);

module.exports = router;
