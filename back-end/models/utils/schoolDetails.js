const schoolDetails = {
  program: {
    type: String,
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
