const schoolDetails = {
  department: {
    type: String,
    // required: [true, "Please provide department"],
    maxlength: 50,
    minlength: 10,
    // default: "College of Computer Studies and Engineering",
  },
  program: {
    type: String,
    // required: [true, "Please provide program"],
    maxlength: 50,
    minlength: 10,
  },
  validID: {
    type: String,
  },
  requiredHours: {
    type: String,
  },
};

module.exports = schoolDetails;
