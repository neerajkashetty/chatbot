const conversation = require("../controllers/conversation");
const express = require("express");

const router = express.Router();

router.post("/conversations", conversation);

module.exports = router;
