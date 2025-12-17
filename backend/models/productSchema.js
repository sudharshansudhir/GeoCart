import mongoose from "mongoose"

const products=new mongoose.Schema({
    name:"String",
    price:"String",
    brand:"String",
    shop_name:"String",
    shop_address:"String",
    exp_date:"String",
    quantity:"String"
})


export default mongoose.model("products",products)