const express = require("express");
const router = express.Router();
const {getUser} = require("../controllers/user");

router.route("/getUser/:email").get(getUser);

module.exports = router;
