const {
  getConversation,
  createConversation,
  listConversationHeadings,
  deleteConversation
} = require("../controllers/conversation");
const express = require("express");

const router = express.Router();

router.get("/conversations", getConversation);

router.post("/conversations-new", createConversation);

router.get("/conversations-list", listConversationHeadings);

router.post("/delete-conver", deleteConversation);

module.exports = router;
