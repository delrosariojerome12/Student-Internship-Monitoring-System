const {
  getAllAttendance,
  getAttendance,
  timeIn,
  timeOut,
} = require("../controllers/attendance");

const express = require("express");
const router = express.Router();

router.route("/getAllAttendance/:email").get(getAllAttendance);
router.route("/getAttendance/:id").get(getAttendance);

router.route("/timeIn/:email").post(timeIn);
router.route("/timeOut/:email/:id").patch(timeOut);

module.exports = router;
