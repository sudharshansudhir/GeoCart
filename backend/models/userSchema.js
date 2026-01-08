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
    }],
    orders:[{
        paymentId:{
            type:"String"
        },
        product:{
            type:mongoose.Schema.Types.ObjectId
        },
        quantity:{
            type:Number
        },
        amount:{
            type:Number
        }
    }]
})


export default mongoose.model("user",user)