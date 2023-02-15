const express = require("express");
const router = express.Router();

const {getAllInternship, getInternship} = require("../controllers/internship");

router.route("/getAllInternship").get(getAllInternship);

router.route("/getInternship").get(getInternship);

module.exports = router;
