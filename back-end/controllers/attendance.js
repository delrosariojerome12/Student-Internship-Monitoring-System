const {BadRequest, NotFound, Duplicate} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Attendance = require("../models/Attendance");
const Intern = require("../models/Intern");
const mongoose = require("mongoose");

const getAllAttendance = async (req, res) => {
  const {email} = req.params;
  const {scheduleType, timeInSchedule, timeOutSchedule} = req.query;

  const userExists = await Intern.findOne({email});

  if (!userExists) {
    throw new NotFound("User not found");
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const hours = now.getHours() % 12 || 12;

  const todayDate = `${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}-${year}`;

  const attendance = await Attendance.find({email});
  const todayExists = await Attendance.findOne({date: todayDate});

  let doesExists = {};

  if (scheduleType === "Regular") {
    if (day > 0 && day < 6) {
      if (todayExists) {
        // timed in
        doesExists = {
          status: "already timed-in",
          timeInExists: true,
          timeOutExists: false,
        };
      } else {
        doesExists = {
          // not yet
          status: "not timed-in",
          timeInExists: false,
          timeOutExists: true,
        };
      }
    } else {
      // disable time
      doesExists = {
        // not yet
        status: "no schedule today",
        timeInExists: true,
        timeOutExists: true,
      };
    }
  } else {
    if (todayExists) {
      // timed in
      doesExists = {
        status: "already timed-in",
        timeInExists: true,
        timeOutExists: false,
      };
    } else {
      doesExists = {
        // not yet
        status: "not timed-in in",
        timeInExists: false,
        timeOutExists: true,
      };
    }
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: attendance,
    doesExists,
    todayAttendance: todayExists,
  });
};

const getAttendance = async (req, res) => {
  const {id} = req.params;

  const attendance = await Attendance.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (!attendance) {
    throw new NotFound("Attendance not found");
  }
  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

const timeIn = async (req, res) => {
  const {email} = req.params;

  if (!email) {
    throw new NotFound("Email not found");
  }
  const attendance = await Attendance.create({email, ...req.body});
  Attendance.createIndexes();

  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

const timeOut = async (req, res) => {
  const {email, id} = req.params;

  if (!email) {
    throw new NotFound("Email not found");
  }

  // const attendance = await Attendance.findOneAndUpdate({_id: id, ...req.body});
  const attendance = await Attendance.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true,
  });

  // const attendance = await Attendance.findById({_id: id});

  if (!attendance) {
    throw new NotFound("Attendance not found. Server error");
  }
  // add patch for updating time rendered for intern

  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

module.exports = {
  getAllAttendance,
  getAttendance,
  timeIn,
  timeOut,
};
