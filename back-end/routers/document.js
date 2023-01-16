const express = require("express");
const router = express.Router();

const {
  getAllDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
} = require("../controllers/document");

router.route("/getAllDocuments").get(getAllDocuments);
router.route("/createDocument").post(createDocument);
router.route("/updateDocument/").patch(updateDocument);
router.route("/deleteDocument/").delete(deleteDocument);

module.exports = router;
