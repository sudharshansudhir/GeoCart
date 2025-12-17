import User from "../models/userSchema.js"
import bcrypt from "bcrypt"


const getUser=async(req,res)=>{
    const user=await User.findById(req._id)
    if(user){
        return res.send(user)
    }
    return res.send({message:"Failed to fetch the user"})
}

const addUser=async(req,res)=>{
    const {name,email,password,phonenumber,address}=req.body
    const emailexist=await User.findOne({email})
    if(emailexist){
        return res.send({message:"User already exist with this email"})
    }
    const hashed = await bcrypt.hash(password,10)
    const added=new User({name,email,password:hashed,phonenumber,address})
    await added.save()
    if(added){
        return res.send({data:added,message:"New user created"})
    }
    return res.send({message:"Failed to create the user"})
}

const editUser=async(req,res)=>{
    
}

const deleteUser=async(req,res)=>{

}
export default {addUser,getUser,deleteUser,editUser}