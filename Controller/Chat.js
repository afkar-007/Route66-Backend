const Chat = require("../Model/chats");


const sendChat = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { senderId, messages, receiverId } = req.body;

    const chat = await Chat.create({
      sender: senderId,
      receiver: receiverId,
      message: messages,
    });

    res.status(200).json({
      message: "Message sent successfully",
      chat,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getmessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const getMessage = await Chat.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("receiver", "name");

    res.status(200).json({
      message: getMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Chat.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        message: "Message not found",
      });
    }
    res.status(200).json({
      message: "Message deleted successfully",
      deletedMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { sendChat,getmessages , deleteChat };
