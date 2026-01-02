import jwt from 'jsonwebtoken'
// const bcrypt=require('bcrypt')

export const isauth=(req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer ", "")    
    try{
        
        if(token){
            req.logId=jwt.verify(token,process.env.SECRET_KEY)
            // console.log(req.logId)
            next()
        }
        else{
            return res.status(404).send({message:"Please Login first"})
        }
    }
    catch(e){
        console.log(".",e)
        return res.status(404).send({message:"You need to login first"})
    }    


}
export const isadminauth=(req,res,next)=>{
    // console.log(req)
    const token=req.header("Authorization")?.replace("Bearer ", "")
    // console.log(token)
    try{
        
        if(token){
            req.logId=jwt.verify(token,process.env.ADMIN_SECRET_KEY)
            // console.log(req.logId)
            next()
        }
        else{
            // console.log("token is",token)
            return res.status(404).send({message:"Please Login first"})
        }
    }
    catch(e){
        // console.log(".",e)
        return res.status(404).send({message:"You need to login first"})
    }
    

}