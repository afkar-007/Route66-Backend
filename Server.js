require("dotenv").config()
const express = require ("express")
const cors = require("cors")
const PORT= process.env.PORT
const ConnectDb= require("./Config/db")

const Router = require("./Routes/UserRoutes")
const chatRouter= require("./Routes/ChatRoutes")

const Chat = require("./Model/chats")


const http = require("http")
const { Server }=require("socket.io")
 

ConnectDb()
const app = express()

const server = http.createServer(app)



const io= new Server(server,{
    cors:{
        origin: "https://route-66-indol.vercel.app/",
        methods: ["GET", "POST"]
    }


})
const onlineUsers = new Map()




io.on("connection",(socket)=>{
    console.log("user connected");


    socket.on("userConnected",(userId)=>{
      
        onlineUsers.set(userId,socket.id)
        
        console.log("User:", userId);
        console.log("Socket:", socket.id);
        
        
    })

    socket.on("sendMessage",(data)=>{
        const receiverSocketId =onlineUsers.get(data.receiverId) 

        if(receiverSocketId){
            io.to(receiverSocketId).emit("receiveMessage",data)
        }



    })


    socket.on("deleteMessage",async(data)=>{
        try{

        const { messageId, senderId, receiverId } = data;
        await Chat.findByIdAndDelete(messageId);

         const receiverSocketId = onlineUsers.get(receiverId);

        
         if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageDeleted", {
                messageId
            });
        }


    } catch(err){
        console.log(err.message);
        
    }



    })

















       socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    
})



app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.get('/',(req,res)=>{
    res.send("this is route 66 backend server ")
})

app.use("/user",Router)
app.use("/chats",chatRouter)


server.listen(PORT,()=>{
    console.log(`Backend server is running on ${PORT}`);
    
})