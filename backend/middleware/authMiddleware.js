import jwt from 'jsonwebtoken'
// const bcrypt=require('bcrypt')

export const isauth=(req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer ", "")    
    try{
        
        if(token){
            req.logId=jwt.verify(token,process.env.SECRET_KEY)
            console.log(req.logId)
            next()
        }
        else{
            return res.status(404).send({message:"Please Login first"})
        }
    }
    catch(e){
        console.log(process.env.SECRET_KEY)
        console.log(token)
        console.log("...",e)
    }
    

}