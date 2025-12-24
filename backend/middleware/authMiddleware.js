import jwt from 'jsonwebtoken'
// const bcrypt=require('bcrypt')

export const isauth=(req,res,next)=>{
        
    try{
        const token=req.header("Authorization")?.replace("Bearer ", "")
        if(token){
            req.logId=jwt.verify(token,process.env.SECRET_KEY)
            console.log(req.logId)
        }
        next()
    }
    catch(e){
        console.log(e)
    }
    

}