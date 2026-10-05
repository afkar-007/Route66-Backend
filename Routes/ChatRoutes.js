const express = require("express")

const chatRouter = express.Router()

const {sendChat,getmessages,deleteChat}= require("../Controller/Chat")
const {getMyChats}= require("../Controller/Chats")

 chatRouter.post("/chat" , sendChat)
 chatRouter.get("/getChat" , getmessages)
 chatRouter.get("/getChats" , getMyChats)
  chatRouter.delete("/deleteChat/:id" , deleteChat)
  



 module.exports= chatRouter
