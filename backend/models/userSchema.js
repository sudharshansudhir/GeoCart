import mongoose from 'mongoose'

const user=new mongoose.Schema({
    name:"String",
    email:"String",
    phonenumber:"String",
    password:"String",
    address:"String",
    cart:[{
        product:{
            type:mongoose.Schema.Types.ObjectId
        },
        quantity:{
            type:Number
        }
    }]
})


export default mongoose.model("user",user)