const express = require("express");
const router = express.Router();

const {
  getIntern,
  getAllInterns,
  updateIntern,
  requestVerification,
  updateDocuments,
  sendDocument,
  removeDocument,
  getAllVerifiedInterns,
  approveDocument,
  rejectDocument,
  enrollInternship,
  unEnrolledInternship,
} = require("../controllers/interns");

router.route("/getAllInterns").get(getAllInterns);
router.route("/getIntern/:email").get(getIntern);
router.route("/updateIntern").patch(updateIntern);
router.route("/requestVerify").patch(requestVerification);

router.route("/updateDocuments/:email").patch(updateDocuments);
router.route("/enrollInternship/:email").patch(enrollInternship);
router.route("/unEnrollInternship/:email").patch(unEnrolledInternship);

router.route("/sendDocument/:email").patch(sendDocument);
router.route("/removeDocument/:email").patch(removeDocument);
router.route("/getAllVerifiedInterns").get(getAllVerifiedInterns);

router.route("/approveDocument/:email").patch(approveDocument);
router.route("/rejectDocument/:email").patch(rejectDocument);

module.exports = router;
