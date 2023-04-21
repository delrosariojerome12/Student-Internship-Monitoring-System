const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  verifyCode,
  forgotPassword,
  resetPassword,
  createUser,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", verifyCode);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);
router.post("/createUser", createUser);

module.exports = router;
