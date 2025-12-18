import Products from "../models/productSchema.js"


export const getProducts=async(req,res)=>{
    const allProduct=await Products.find()
    if(allProduct.length==0){
        return res.send({message:"Data not found"})
    }
    return res.send(allProduct)
}

export const addProducts=async(req,res)=>{
    const {name,brand,shop_name,shop_address,price,exp_date,quantity}=req.body;
    const added=new Products({name,price,brand,exp_date,quantity,shop_name,shop_address})
    await added.save()
    if(added){
        return res.send({data:added,message:"New Product is created Sucessfully"})
    }
    return res.send({message:"Failed to insert the new product"})
}

export const editProducts=async(req,res)=>{
    
}

export const deleteProducts=async(req,res)=>{

}
// export default {addProducts,getProducts,deleteProducts,editProducts}