const express = require("express");
const {
  docLoader,
  addDocumentsToPinecone,
} = require("../controllers/docLoader");
const { docLoader } = userController;

const router = express.Router();

router.post("/ai", docLoader);

router.post("/addDocs", addDocumentsToPinecone);

module.exports = router;
