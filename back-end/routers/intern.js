const express = require("express");
const router = express.Router();

const {
  getIntern,
  getAllInterns,
  updateIntern,
  requestVerification,
  updateDocuments,
} = require("../controllers/interns");

router.route("/getAllInterns").get(getAllInterns);
router.route("/updateDocuments/:email").patch(updateDocuments);
router.route("/getIntern/:email").get(getIntern);
router.route("/updateIntern").patch(updateIntern);
router.route("/requestVerify").patch(requestVerification);

module.exports = router;
