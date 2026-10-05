
 async function Auth(req,res,next)
 {
    try{

    const token = req.headers.authorization

    if(!token){
        return  res.status(420).json({
            message:"Un authorized entry"
        })
    }
    next()

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


module.exports=Auth