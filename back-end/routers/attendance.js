const {
  getAllAttendance,
  getAttendance,
  getAllNarrative,
  timeIn,
  timeOut,
  checkStartingDate,
  getAllAttendanceToday,
  getAllAttendanceByDate,
  checkAbsents,
  updateNarrative,
  checkInternsStartingToday,
  wakeup,
} = require("../controllers/attendance");

const express = require("express");
const router = express.Router();

router.route("/getAllAttendance/:email").get(getAllAttendance);
router.route("/getAllAttendanceToday").get(getAllAttendanceToday);
router.route("/getAllNarrative/:email").get(getAllNarrative);

router.route("/wakeUp").get(wakeup);

router.route("/checkAbsents").post(checkAbsents);

router.route("/getAllAttendanceByDate").get(getAllAttendanceByDate);

router.route("/getAttendance/:id").get(getAttendance);

router.route("/timeIn/:email").post(timeIn);
router.route("/timeOut/:email").patch(timeOut);

router.route("/checkInternsStartingToday").patch(checkInternsStartingToday);

router.route("/checkStartingDate/:email").patch(checkStartingDate);
router.route("/updateNarrative/:email").patch(updateNarrative);

module.exports = router;
