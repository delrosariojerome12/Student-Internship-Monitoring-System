const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyCode,
  forgotPassword,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", verifyCode);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
