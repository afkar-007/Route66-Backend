const Chat = require("../Model/chats");

const getMyChats = async (req, res) => {
  try {
    const { userId } = req.query;

    const messages = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name")
      .populate("receiver", "name");

    const users = new Map();

    messages.forEach((chat) => {
      



      let otherUser;

      if (String(chat.sender._id) === String(userId)) {
        otherUser = chat.receiver;
      } else {
        otherUser = chat.sender;
      }

      if (!users.has(String(otherUser._id))){
        
        users.set(
          String(otherUser._id),
          {
            user: { _id: otherUser._id, name: otherUser.name },
            lastMessage: chat.message,
          });
      }

     
    });

     const Chats = Array.from(users.values());

      res.status(200).json({
        message: "chats fetched successfully",
        Chats,
      });
      








  } catch (err) {
    res.status(500).json({
      message:err.message
    })
  }
};




module.exports={getMyChats}

