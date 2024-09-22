const express = require("express");
const {
  getConversation,
  createConversation,
  listConversationHeadings,
  deleteConversation
} = require("../controllers/conversation");

const router = express.Router();

router.post("/conversations", getConversation);
router.post("/conversations-new", createConversation);
router.get("/conversations-list", listConversationHeadings);
router.post("/delete-conver", deleteConversation);

module.exports = router;
