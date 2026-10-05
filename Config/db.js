const mongoose = require("mongoose")



async function ConnectDb() {
    
    try{
       await mongoose.connect(process.env.Mongo_url)
       console.log("DB connected");
       

    }
    catch(err){
        console.log(err.message);
        
    }

}


module.exports=ConnectDb