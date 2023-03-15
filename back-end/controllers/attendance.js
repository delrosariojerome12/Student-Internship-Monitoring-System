const {BadRequest, NotFound, Duplicate} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Attendance = require("../models/Attendance");
const Intern = require("../models/Intern");
const mongoose = require("mongoose");
const User = require("../models/User");
const Internship = require("../models/Internship");

function countRenderedHours(timeIn, timeOut) {
  const millisecondsInHour = 1000 * 60 * 60;

  // Convert 12-hour time to 24-hour time
  const [hoursIn, minutesIn, secondsIn, meridiemIn] = timeIn.split(/:|\s/);
  const [hoursOut, minutesOut, secondsOut, meridiemOut] = timeOut.split(/:|\s/);

  const hours24In =
    meridiemIn === "AM"
      ? parseInt(hoursIn) % 12
      : (parseInt(hoursIn) % 12) + 12;
  const hours24Out =
    meridiemOut === "AM"
      ? parseInt(hoursOut, 10) % 12
      : (parseInt(hoursOut, 10) % 12) + 12;

  const dateIn = new Date(
    `2000-01-01T${
      hours24In < 10 ? `0${hours24In}` : hours24In
    }:${minutesIn}:${secondsIn}`
  );
  const dateOut = new Date(
    `2000-01-01T${
      hours24Out < 10 ? `0${hours24Out}` : hours24Out
    }:${minutesOut}:${secondsOut}`
  );
  const difference = dateOut - dateIn;

  let hours = difference / millisecondsInHour;
  hours = Math.round(hours * 4) / 4; // Round to nearest quarter hour

  if (hours >= 8) {
    console.log("Test");
    hours--;
  }
  console.log(typeof hours);
  console.log(hours);
  return hours;
}

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

  // countRenderedHours("08:20:20 AM", "14:40:20 PM");

  const now = new Date();

  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const date = now.getDate() + 1 < 10 ? `0${now.getDate()}` : now.getDate();

  const day = now.getDay();

  const todayDate = `${month}-${date}-${year}`;
  console.log(todayDate);

  const attendance = await Attendance.find({email});
  const todayExists = await Attendance.findOne({
    date: todayDate,
    email,
  });

  let doesExists = {};

  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const amOrPm = now.getHours() >= 12 ? "PM" : "AM";

  console.log(`${hours}:${minutes} ${amOrPm}`);

  if (scheduleType === "Regular") {
    if (day > 0 && day < 6) {
      if (hours >= 7 && hours <= 10 && amOrPm === "AM") {
        // check if greater than 10:30
        if (minutes > 30 && hours === 10) {
          doesExists = {
            status: "too-late",
          };
        }
        // time in morning
        else if (!todayExists) {
          doesExists = {
            status: "no-time-in",
            time: "morning",
          };
        } else if (todayExists) {
          doesExists = {
            status: "already-timed-in",
          };
        }
      } else if (hours >= 12 && minutes <= 59 && amOrPm === "PM") {
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
            console.log(todayExists.timeOut);
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
            time: "afternoon time in",
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
              if (todayExists.timeIn == null && todayExists.timeOut == null) {
                doesExists = {
                  status: "absent",
                };
              }
              if (todayExists.timeIn !== null && todayExists.timeOut !== null) {
                console.log(todayExists.timeOut);
                doesExists = {
                  status: "complete",
                };
              }
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
    if (day > 0 && day < 6) {
      if (hours >= 7 && hours <= 10 && amOrPm === "AM") {
        // check if greater than 10:30
        if (minutes > 30 && hours === 10) {
          doesExists = {
            status: "too-late",
          };
        }
        // time in morning
        else if (!todayExists) {
          doesExists = {
            status: "no-time-in",
            time: "morning",
          };
        } else if (todayExists) {
          doesExists = {
            status: "already-timed-in",
          };
        }
      } else if (hours >= 12 && minutes <= 59 && amOrPm === "PM") {
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
            console.log(todayExists.timeOut);
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
            time: "afternoon time in",
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
              if (todayExists.timeIn !== null && todayExists.timeOut !== null) {
                console.log(todayExists.timeOut);
                doesExists = {
                  status: "complete",
                };
              }
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

  const day = now.getDay();

  const todayDate = `${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}-${year}`;

  if (day > 0 && day < 6) {
    const allInterns = await Intern.find({
      status: "Starting",
    });
    const todayDate = `${month < 10 ? "0" : ""}${month}-${
      date < 10 ? "0" : ""
    }${date}-${year}`;

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
  } else {
    const todayDate = `${month < 10 ? "0" : ""}${month}-${
      date < 10 ? "0" : ""
    }${date}-${year}`;

    const allInterns = await Intern.find({
      "scheduleDetails.scheduleType": "Irregular",
      status: "Starting",
    });
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
  }

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

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const hours =
    now.getHours() % 12 || 12 < 10
      ? `0${now.getHours() % 12 || 12}`
      : now.getHours() % 12 || 12;
  const minutes =
    10 > now.getMinutes() ? `0${now.getMinutes()}` : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  const amOrPm = now.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

  const fullHour = `${hours}:${minutes}:${seconds} ${amOrPm}`;

  const todayDate = `${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}-${year}`;

  if (!email) {
    throw new NotFound("Email not found");
  }

  const intern = await Intern.findOne({email});

  const attendance = await Attendance.findOne({email, date: todayDate})
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "intern",
      model: "Intern",
    });

  const startingTime = attendance.timeIn;

  const totalRendered = countRenderedHours(startingTime, fullHour);

  const currentTotalHours =
    parseFloat(intern.internshipDetails.renderedHours) + totalRendered;

  const todayAttendance = await Attendance.findOneAndUpdate(
    {
      _id: attendance._id,
      email,
      date: todayDate,
    },
    {...req.body, totalRendered: totalRendered.toString()},
    {
      new: true,
      runValidators: true,
    }
  );
  const updatedIntern = await Intern.findOneAndUpdate(
    {email},
    {"internshipDetails.renderedHours": currentTotalHours.toString()},
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "user",
    model: "User",
  });
  const updatedAttendance = await Attendance.find({email});

  res
    .status(StatusCodes.OK)
    .json({success: true, updatedIntern, todayAttendance, updatedAttendance});
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
