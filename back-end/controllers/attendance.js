const {BadRequest, NotFound, Duplicate} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Attendance = require("../models/Attendance");
const Intern = require("../models/Intern");
const mongoose = require("mongoose");
const User = require("../models/User");
const Internship = require("../models/Internship");

// student
const getAllAttendance = async (req, res) => {
  const {email} = req.params;
  const {
    scheduleDetails: {scheduleType},
  } = req.query;

  const userExists = await Intern.findOne({email});

  if (!userExists) {
    throw new NotFound("User not found");
  }

  const now = new Date();

  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const date = now.getDate() + 1 < 10 ? `0${now.getDate()}` : now.getDate();

  const day = now.getDay();

  const todayDate = `${month}-${date}-${year}`;

  const attendance = await Attendance.find({email});
  const todayExists = await Attendance.findOne({
    date: todayDate,
    email,
  });

  let doesExists = {};
  // console.log(todayExists.isPresent);

  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const amOrPm = now.getHours() >= 12 ? "PM" : "AM";

  if (scheduleType === "Regular") {
    if (day > 0 && day < 6) {
      if (
        (hours >= 8 && hours < 10 && amOrPm === "AM") ||
        (hours === 10 && minutes <= 20 && amOrPm === "AM")
      ) {
        // time in morning
        if (!todayExists) {
          doesExists = {
            status: "no-time-in",
          };
        } else if (todayExists) {
          doesExists = {
            status: "already-timed-in",
          };
        }
      } else if (hours === 12 && minutes <= 59 && amOrPm === "PM") {
        // adjust
        // lunch
        if (!todayExists) {
          doesExists = {
            status: "no-time-in-lunch",
          };
        } else if (todayExists) {
          doesExists = {
            status: "already-timed-in-lunch",
          };
          if (todayExists.timeIn !== null && todayExists.timeOut !== null) {
            doesExists = {
              status: "complete",
            };
          }
        }
      } else if (hours === 1 && minutes <= 30 && amOrPm === "PM") {
        // time in afternoon
        if (!todayExists) {
          doesExists = {
            status: "no-time-in",
          };
        } else if (todayExists) {
          doesExists = {
            status: "already-timed-in",
          };
        }
      } else if (hours >= 2 && amOrPm === "PM") {
        // absent
        // disable time in and time out
        if (!todayExists) {
          doesExists = {
            status: "absent",
          };
        } else {
          if (hours >= 4 && hours <= 5 && amOrPm === "PM") {
            // time out
            if (!todayExists) {
              doesExists = {
                status: "no-time-in-afternoon",
              };
            } else if (todayExists) {
              doesExists = {
                status: "time-out-standard",
              };
            } else if (hours <= 6 && amOrPm === "PM") {
              // ot
              if (!todayExists) {
                doesExists = {
                  status: "no-time-in-afternoon",
                };
              } else if (todayExists) {
                doesExists = {
                  status: "time-out-overtime",
                };
              }
            }
          }
        }
      }
    } else {
      // disable time
      doesExists = {
        // not yet
        status: "no-schedule",
      };
    }
  } else {
    // irregular
    if (
      (hours >= 8 && hours < 10 && amOrPm === "AM") ||
      (hours === 10 && minutes <= 20 && amOrPm === "AM")
    ) {
      // time in morning
      if (!todayExists) {
        doesExists = {
          status: "no-time-in",
        };
      } else if (todayExists) {
        doesExists = {
          status: "already-timed-in",
        };
      }
    } else if (hours === 12 && minutes <= 59 && amOrPm === "PM") {
      // adjust
      // lunch
      if (!todayExists) {
        doesExists = {
          status: "no-time-in-lunch",
        };
      } else if (todayExists) {
        doesExists = {
          status: "already-timed-in-lunch",
        };
        if (todayExists.timeIn !== null && todayExists.timeOut !== null) {
          doesExists = {
            status: "complete",
          };
        }
      }
    } else if (hours === 1 && minutes <= 30 && amOrPm === "PM") {
      // time in afternoon
      if (!todayExists) {
        doesExists = {
          status: "no-time-in",
        };
      } else if (todayExists) {
        doesExists = {
          status: "already-timed-in",
        };
      }
    } else if (hours >= 2 && amOrPm === "PM") {
      // absent
      // disable time in and time out
      if (!todayExists) {
        doesExists = {
          status: "absent",
        };
      } else {
        if (hours >= 4 && hours <= 5 && amOrPm === "PM") {
          // time out
          if (!todayExists) {
            doesExists = {
              status: "no-time-in-afternoon",
            };
          } else if (todayExists) {
            doesExists = {
              status: "time-out-standard",
            };
          } else if (hours <= 6 && amOrPm === "PM") {
            // ot
            if (!todayExists) {
              doesExists = {
                status: "no-time-in-afternoon",
              };
            } else if (todayExists) {
              doesExists = {
                status: "time-out-overtime",
              };
            }
          }
        }
      }
    }
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: attendance,
    doesExists,
    todayAttendance: todayExists,
  });
};

// coordinator
const getAllAttendanceToday = async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const todayDate = `${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}-${year}`;

  const allAttendanceToday = await Attendance.find({date: todayDate})
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "intern",
      model: "Intern",
    });

  res.status(StatusCodes.OK).json({
    success: true,
    data: allAttendanceToday,
  });
};

const checkAbsents = async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const todayDate = `${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}-${year}`;

  const allInterns = await Intern.find({status: "Starting"});
  const internEmails = allInterns.map((item) => item.email);

  for (let email of internEmails) {
    const attendance = await Attendance.findOne({
      email: email,
      date: todayDate,
    });
    if (!attendance) {
      // Create attendance for absent interns
      const user = await User.findOne({email});
      const intern = await Intern.findOne({email});
      const newAttendance = new Attendance({
        email: email,
        date: todayDate,
        isPresent: false,
        timeIn: null,
        timeOut: null,
        user: user._id,
        intern: intern._id,
        proof: null,
      });
      await newAttendance.save();
    }
  }
  const allAttendance = await Attendance.find()
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "intern",
      model: "Intern",
    });

  res.status(StatusCodes.OK).json({
    success: true,
    data: allAttendance,
  });
};

const getAllAttendanceByDate = async (req, res) => {
  const {date, renderedHours} = req.query;

  const filter = {};

  if (date) {
    const dateArr = date.split("-");
    const newDate = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
    filter.date = newDate;
  }

  if (renderedHours) {
    filter.totalRendered = renderedHours;
  }

  const allAttendanceByDate = await Attendance.find({...filter})
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "intern",
      model: "Intern",
    });

  res.status(StatusCodes.OK).json({
    success: true,
    data: allAttendanceByDate,
    searched: [date, renderedHours],
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

  const user = await User.findOne({email});
  const intern = await Intern.findOne({email});

  const attendance = await Attendance.create({
    user: user._id,
    intern: intern._id,
    email,
    ...req.body,
  });

  Attendance.createIndexes();

  const populatedAttendance = await Attendance.findById(attendance._id)
    .populate("user")
    .populate("intern");

  res.status(StatusCodes.OK).json({success: true, data: populatedAttendance});
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

const checkStartingDate = async (req, res) => {
  const {email} = req.params;

  const intern = await Intern.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({success: true, data: intern});
};

module.exports = {
  getAllAttendance,
  getAllAttendanceToday,
  getAllAttendanceByDate,
  getAttendance,
  timeIn,
  timeOut,
  checkStartingDate,
  checkAbsents,
};
