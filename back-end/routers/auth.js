const express = require("express");
const router = express.Router();
const {signup, login, verifyCode} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", verifyCode);

module.exports = router;
