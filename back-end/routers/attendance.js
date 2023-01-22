const express = require("express");
const router = express.Router();

const {
  getAllAttendance,
  getAttendance,
  createAttendance,
  //updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance");

router.route("/getAllAttendance").get(getAllAttendance);
router.route("/getAttendance").get(getAttendance);
router.route("/createAttendance").post(createAttendance);
//router.route("/updateAttendance/:id").patch(updateAttendance);
router.route("/deleteAttendance/:id").delete(deleteAttendance);

module.exports = router;
