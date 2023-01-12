const express = require("express");
const router = express.Router();

const { createDocument } = require("../controllers/documents");

router.route("/createDocument").post(createDocument);

module.exports = router;
