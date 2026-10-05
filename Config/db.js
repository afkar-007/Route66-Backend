const mongoose = require("mongoose")



async function ConnectDb() {
    
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("DB connected");
       

    }
    catch(err){
        console.log(err.message);
        
    }

}


module.exports=ConnectDb