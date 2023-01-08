const schoolDetails = {
  // department: {
  //   type: String,
  //   // required: [true, "Please provide department"],
  //   maxlength: 50,
  //   minlength: 10,
  //   // default: "College of Computer Studies and Engineering",
  // },
  program: {
    type: String,
    // required: [true, "Please provide program"],
    maxlength: 50,
    minlength: 10,
  },

  validID: {
    type: Object,
    name: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  studentContact: {
    type: String,
    maxlength: 11,
    minlength: 1,
  },
  requiredHours: {
    type: String,
  },
};

module.exports = schoolDetails;
