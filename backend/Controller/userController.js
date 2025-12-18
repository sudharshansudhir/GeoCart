import User from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const getUser=async(req,res)=>{
    const user=await User.find()
    if(user){
        return res.send(user)
    }
    return res.send({message:"Failed to fetch the user"})
}

export const addUser=async(req,res)=>{
    const {name,email,password,phonenumber,address}=req.body
    const emailexist=await User.findOne({email})
    if(emailexist){
        return res.send({message:"User already exist with this email"})
    }
    const hashed = await bcrypt.hash(password,10)
    const added=new User({name,email,password:hashed,phonenumber,address})
    await added.save()
    const id=added._id
    if(added){
        const token=jwt.sign({id},process.env.SECRET_KEY)

        return res.send({data:added,token:token,message:"New user created"})
    }
    return res.send({message:"Failed to create the user"})
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const spec_user=await User.findOne({email})
    if(!spec_user){
        return res.send({message:"Please register first to continue!"})       
    }
    const rehashed=await bcrypt.compare(password,spec_user.password)
    if(!password==rehashed){
        return res.send({message:"Invalid password"})
    }
    const id=spec_user._id
    const token=jwt.sign({id},process.env.SECRET_KEY)
    return res.send({token:token,data:spec_user,message:"Login Success!"})
}

export const editUser=async(req,res)=>{
    
}

export const deleteUser=async(req,res)=>{

}
// export default {addUser,getUser,deleteUser,editUser,loginUser}