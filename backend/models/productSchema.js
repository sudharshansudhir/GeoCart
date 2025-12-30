import mongoose from "mongoose"

const products=new mongoose.Schema({
    name:"String",
    price:"String",
    brand:"String",
    shop_name:"String",
    category:"String",
    img:"String",
    shop_address:"String",
    exp_date:"String",
    inStock:{
        type:Boolean,
        
  default: false
    },
    quantity:"String"
})


export default mongoose.model("products",products)