const {BadRequest, NotFound, Duplicate} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Attendance = require("../models/Attendance");
const Intern = require("../models/Intern");
const mongoose = require("mongoose");
const User = require("../models/User");

const moment = require("moment-timezone");
const axios = require("axios");
const cron = require("node-cron");

function countRenderedHours(timeIn, timeOut) {
  const millisecondsInHour = 1000 * 60 * 60;

  console.log(timeIn, "timeIn");
  console.log(timeOut, "timeOut");
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

  console.log(dateIn, dateOut, "date in");
  console.log(difference, "difference");

  let hours = difference / millisecondsInHour;
  // hours = Math.round(hours * 4) / 4; // Round to nearest quarter hour

  hours = Math.round(hours * 2) / 2;

  if (hours >= 8) {
    console.log("Test");
    hours--;
  }
  console.log(typeof hours);
  console.log(hours);
  return hours;
}

const getAllNarrative = async (req, res) => {
  const {email} = req.params;

  const userExists = await Intern.findOne({email});

  if (!userExists) {
    throw new NotFound("User not found");
  }

  const attendance = await Attendance.find({email});

  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

// student
const getAllAttendance = async (req, res) => {
  const {email} = req.params;
  const {
    scheduleDetails: {scheduleType},
    timeObject: {day, hours, minutes, amOrPm, todayDate},
  } = req.query;

  const userExists = await Intern.findOne({email});

  if (!userExists) {
    throw new NotFound("User not found");
  }

  // const now = new Date();
  // const year = now.getFullYear();
  // const month =
  //   now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  // const date = now.getDate() + 1 < 10 ? `0${now.getDate()}` : now.getDate();

  // const day = now.getDay();

  // const todayDate = `${month}-${date}-${year}`;

  // const hours = now.getHours() % 12 || 12;
  // const minutes = now.getMinutes();
  // const amOrPm = now.getHours() >= 12 ? "PM" : "AM";

  const attendance = await Attendance.find({email});
  const todayExists = await Attendance.findOne({
    date: todayDate,
    email,
  });

  let doesExists = {};

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
          if (hours >= 2 && hours <= 5 && amOrPm === "PM") {
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

// change time zone here
const timeOut = async (req, res) => {
  const {email, id} = req.params;

  const todayDate = moment().tz("Asia/Manila").format("MM-DD-YYYY");
  const currentTime = moment().tz("Asia/Manila");
  // const hours = currentTime.hour() > 12 ? hours - 12 : hours;
  // const minutes = currentTime.minute();
  // const seconds = currentTime.seconds();

  const hours =
    currentTime.hour() > 12
      ? currentTime.hour() - 12
      : currentTime.hour() < 10
      ? "0" + currentTime.hour()
      : currentTime.hour();
  const minutes =
    currentTime.minute() < 10
      ? "0" + currentTime.minute()
      : currentTime.minute();
  const seconds =
    currentTime.second() < 10
      ? "0" + currentTime.second()
      : currentTime.second();
  const amPm = moment().format("A");

  // const now = new Date();
  // const year = now.getFullYear();
  // const month = now.getMonth() + 1;
  // const date = now.getDate();

  // const hours =
  //   now.getHours() % 12 || 12 < 10
  //     ? `0${now.getHours() % 12 || 12}`
  //     : now.getHours() % 12 || 12;
  // const minutes =
  //   10 > now.getMinutes() ? `0${now.getMinutes()}` : now.getMinutes();
  // const seconds =
  //   now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  // const amOrPm = now.getHours() >= 12 ? "PM" : "AM"; // set AM or PM

  const fullHour = `${hours}:${minutes}:${seconds} ${amPm}`;

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

  console.log(fullHour, "fullHour");
  console.log(totalRendered);

  const currentTotalHours =
    parseFloat(intern.internshipDetails.renderedHours) + totalRendered;

  const todayAttendance = await Attendance.findOneAndUpdate(
    {
      _id: attendance._id,
      email,
      date: todayDate,
    },
    {
      ...req.body,
      totalRendered: totalRendered.toString(),
    },
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

  const internDetails = await Intern.findOne({email});

  const {
    internshipDetails: {startingDate},
  } = internDetails;

  const today = moment();
  const formattedStartingDate = moment(startingDate, "YYYY-MM-DD");

  if (formattedStartingDate.isSameOrBefore(today, "day")) {
    const intern = await Intern.findOneAndUpdate({email}, req.body, {
      new: true,
      runValidators: true,
    }).populate({
      path: "user",
      model: "User",
    });
    return res.status(StatusCodes.OK).json({success: true, data: intern});
  }
  res.status(StatusCodes.OK).json({success: true, msg: "not yet"});
};

const updateNarrative = async (req, res) => {
  const {email} = req.params;
  const {
    params: {date},
    data: {content},
  } = req.body;

  if (!content) {
    const attendance = await Attendance.findOneAndUpdate(
      {email, date},
      {"narrative.content": content, "narrative.isComplete": false},
      {new: true}
    );
    const allAttendance = await Attendance.find({email});
    res.status(StatusCodes.OK).json({success: true, attendance, allAttendance});
  } else {
    const attendance = await Attendance.findOneAndUpdate(
      {email, date},
      {"narrative.content": content, "narrative.isComplete": true},
      {new: true}
    );
    const allAttendance = await Attendance.find({email});

    res.status(StatusCodes.OK).json({success: true, attendance, allAttendance});
  }
};

const checkAbsents = async (req, res) => {
  const todayDate = moment().tz("Asia/Manila").format("MM-DD-YYYY");
  const day = moment().tz("Asia/Manila").day();
  const currentTime = moment().tz("Asia/Manila");

  if (day > 0 && day < 6) {
    const allInterns = await Intern.find({
      status: "Starting",
    });
    const internEmails = allInterns.map((item) => item.email);

    for (let email of internEmails) {
      const attendance = await Attendance.findOne({
        email: email,
        date: todayDate,
      });

      if (
        !attendance &&
        currentTime.hour() === 14 &&
        currentTime.minute() === 0
      ) {
        // Create attendance for absent interns
        const user = await User.findOne({email});
        const intern = await Intern.findOne({email});
        const newAttendance = new Attendance({
          email: email,
          date: todayDate,
          isPresent: false,
          isComplete: true,
          timeIn: null,
          timeOut: null,
          user: user._id,
          intern: intern._id,
          proof: null,
        });

        await newAttendance.save();
      } else if (
        currentTime.hour() === 18 &&
        attendance.timeIn &&
        !attendance.timeOut
      ) {
        const attendance = await Attendance.findOne({email, date: todayDate})
          .populate({
            path: "user",
            model: "User",
          })
          .populate({
            path: "intern",
            model: "Intern",
          });

        const absentAttendance = await Attendance.findOneAndUpdate(
          {
            _id: attendance._id,
            email,
            date: todayDate,
          },
          {
            isPresent: false,
            isComplete: true,
            missingTimeOut: true,
          },
          {new: true, runValidators: true}
        );

        console.log(absentAttendance);
        console.log("no timeout");

        await absentAttendance.save();
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

const checkInternsStartingToday = async (req, res) => {
  const allIntern = await Intern.find({
    "verification.isVerified": true,
    status: "Not Started",
  }).populate({
    path: "user",
    model: "User",
  });

  for (let intern of allIntern) {
    const {
      internshipDetails: {startingDate},
      email,
    } = intern;

    const today = moment();
    const formattedStartingDate = moment(startingDate, "YYYY-MM-DD");

    if (formattedStartingDate.isSameOrBefore(today, "day")) {
      const intern = await Intern.findOneAndUpdate(
        {email},
        {status: "Starting"},
        {
          new: true,
          runValidators: true,
        }
      ).populate({
        path: "user",
        model: "User",
      });
      return res.status(StatusCodes.OK).json({success: true, data: intern});
    }
  }
  res.status(StatusCodes.OK).json({success: true, msg: "not yet"});
};

const runCheckAbsents = async () => {
  try {
    // const response = await axios.post(
    //   "http://localhost:5000/attendance/checkAbsents"
    // );
    const response = await axios.post(
      "https://sims-twqb.onrender.com/attendance/checkAbsents"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const runStartingToday = async () => {
  try {
    // const response = await axios.patch(
    //   "http://localhost:5000/attendance/checkInternsStartingToday"
    // );
    const response = await axios.patch(
      "https://sims-twqb.onrender.com/attendance/checkInternsStartingToday"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// check absents
cron.schedule(
  "0 14 * * *",
  () => {
    const currentTime = moment().tz("Asia/Manila");
    if (currentTime.hour() === 14 && currentTime.minute() === 0) {
      runCheckAbsents();
    }
  },
  {
    timezone: "Asia/Manila",
  }
);

// check starting today
cron.schedule(
  "12 11 * * *",
  () => {
    const currentTime = moment().tz("Asia/Manila");
    if (currentTime.hour() === 11 && currentTime.minute() === 12) {
      console.log("running");
      runStartingToday();
    }
  },
  {
    timezone: "Asia/Manila",
  }
);

// check without timeouts
cron.schedule(
  "0 18 * * *",
  () => {
    const currentTime = moment().tz("Asia/Manila");
    if (currentTime.hour() === 18 && currentTime.minute() === 0) {
      runCheckAbsents();
      console.log("running");
    }
  },
  {
    timezone: "Asia/Manila",
  }
);

module.exports = {
  getAllAttendance,
  getAllAttendanceToday,
  getAllAttendanceByDate,
  getAttendance,
  getAllNarrative,
  timeIn,
  timeOut,
  checkStartingDate,
  checkInternsStartingToday,
  checkAbsents,
  updateNarrative,
};
