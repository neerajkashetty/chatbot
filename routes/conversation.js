const {
  getConversation,
  createConversation,
  listConversationHeadings,
} = require("../controllers/conversation");
const express = require("express");

const router = express.Router();

router.get("/conversations", getConversation);

router.post("/conversations-new", createConversation);

router.get("/conversations-list", listConversationHeadings);

module.exports = router;
