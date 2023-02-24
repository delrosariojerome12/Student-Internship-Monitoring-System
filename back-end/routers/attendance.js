const {
  createAttendance,
  getAllAttendance,
  getAttendance,
} = require("../controllers/attendance");

const express = require("express");
const router = express.Router();

router.route("/getAllAttendance/:email").get(getAllAttendance);
router.route("/getAttendance/:id").get(getAttendance);
router.route("/createAttendance/:email").post(createAttendance);

module.exports = router;
