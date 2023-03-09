const {
  getAllAttendance,
  getAttendance,
  timeIn,
  timeOut,
  checkStartingDate,
  getAllAttendanceToday,
  getAllAttendanceByDate,
  checkAbsents,
} = require("../controllers/attendance");

const express = require("express");
const router = express.Router();

router.route("/getAllAttendance/:email").get(getAllAttendance);
router.route("/getAllAttendanceToday").get(getAllAttendanceToday);
router.route("/checkAbsents").post(checkAbsents);

router.route("/getAllAttendanceByDate").get(getAllAttendanceByDate);

router.route("/getAttendance/:id").get(getAttendance);

router.route("/timeIn/:email").post(timeIn);
router.route("/timeOut/:email/:id").patch(timeOut);

router.route("/checkStartingDate/:email").patch(checkStartingDate);

module.exports = router;
