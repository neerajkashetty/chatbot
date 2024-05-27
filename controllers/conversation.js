const { Conversations } = require("../sequelize/models");

const getConversation = async (req, res) => {
  try {
    const { userId, conversationId } = req.body;

    const conversation = await Conversations.findOne({
      where: {
        userId,
        conversationId,
      },
    });

    if (conversation) {
      return res.json({
        success: true,
        data: {
          conversationId: conversation.conversationId,
          userMessages: conversation.userMessages,
          botMessages: conversation.botMessages,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        },
      });
    } else {
      return res.json({
        success: false,
        message:
          "No Conversations exist for the given userId and conversationId",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const createConversation = async (req, res) => {
  try {
    const { userId, userMessage, botMessage } = req.body;

    const newConversation = await Conversations.create({
      userId,
      userMessages: [userMessage],
      botMessages: [botMessage],
    });

    return res.status(201).json({
      success: true,
      data: newConversation,
    });
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  getConversation,
  createConversation,
};
