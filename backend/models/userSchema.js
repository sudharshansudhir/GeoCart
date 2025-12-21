import mongoose from 'mongoose'

const user=new mongoose.Schema({
    name:"String",
    email:"String",
    phonenumber:"String",
    password:"String",
    address:"String",
    cart:[{type:"String"}]
})


export default mongoose.model("user",user)