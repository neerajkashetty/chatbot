const {
  getConversation,
  createConversation,
} = require("../controllers/conversation");
const express = require("express");

const router = express.Router();

router.get("/conversations", getConversation);

router.post("/conversations-new", createConversation);

module.exports = router;
