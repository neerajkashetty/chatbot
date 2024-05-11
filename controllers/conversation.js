const { Conversations } = require("../sequelize/models");

const conversation = async (req, res) => {
  try {
    const userId = req.body.userId;

    console.log(userId);

    const conversations = await Conversations.findAll({
      attributes: [
        "id",
        "userInput",
        "botResponse",
        "userId",
        "createdAt",
        "updatedAt",
      ],
      where: {
        userId: userId,
      },
    });

    if (conversations.length > 0) {
      console.log("Conversations exist for the user");

      const data = conversations.map((conversation) => ({
        id: conversation.id,
        userInput: conversation.userInput,
        botResponse: conversation.botResponse,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      }));

      return res.json({
        success: true,
        data: data,
      });
    } else {
      console.log("New User");
      return res.json({
        success: false,
        message: "No Conversations exist for the userId",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  conversation,
};
