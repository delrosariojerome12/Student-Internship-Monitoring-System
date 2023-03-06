const express = require("express");
const router = express.Router();

const {
  getAllDailyRecord,
  getDailyRecord,
  createDailyRecord,
  //updateAttendance,
  //deleteAttendance,
} = require("../controllers/dailyRecord");

router.route("/getAllDailyRecord").get(getAllDailyRecord);
router.route("/getDailyRecord").get(getDailyRecord);
router.route("/createDailyRecord").post(createDailyRecord);
//router.route("/updateAttendance/:id").patch(updateAttendance);
//router.route("/deleteAttendance/:id").delete(deleteAttendance);

module.exports = router;
