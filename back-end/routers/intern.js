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
} = require("../controllers/interns");

router.route("/getAllInterns").get(getAllInterns);
router.route("/getIntern/:email").get(getIntern);
router.route("/updateIntern").patch(updateIntern);
router.route("/requestVerify").patch(requestVerification);

router.route("/updateDocuments/:email").patch(updateDocuments);
router.route("/sendDocument/:email").patch(sendDocument);
router.route("/removeDocument/:email").patch(removeDocument);

module.exports = router;
