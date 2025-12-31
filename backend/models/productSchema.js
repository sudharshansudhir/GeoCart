import mongoose from "mongoose"

const products=new mongoose.Schema({
    name:"String",
    price:"String",
    brand:"String",
    category:"String",
    img:"String",
    exp_date:"String",
    inStock:{
        type:Boolean,      
        default: false
    },
    quantity:"String"
})


export default mongoose.model("products",products)