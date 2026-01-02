import Products from "../models/productSchema.js"
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getProducts=async(req,res)=>{
    const allProduct=await Products.find()
    if(allProduct.length==0){
        return res.send({message:"Data not found"})
    }
    return res.send(allProduct)
}

export const addProducts = async (req, res) => {
  try {
    const {
      name, brand, price, category, inStock, exp_date, quantity
    } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "GeoCart_Images",
      });
      imageUrl = result.secure_url;

      // cleanup local temp file
      fs.unlinkSync(req.file.path);
    }

    const added = new Products({
      name,
      brand,
      price,
      category,
      exp_date,
      quantity,
      inStock,
      img: imageUrl,
    });

    await added.save();

    res.status(201).json({
      message: "Product created successfully",
      data: added,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


export const toggleStock=async(req,res)=>{
    const id=req.params.id
    const item=await Products.findById(id)
    if(item){
        item.inStock= !(item.inStock)
        await item.save()
        // console.log("Stock of ",id,"is ",item.inStock)
    }
    
}


export const editProducts=async(req,res)=>{
      const payload=req.body.payload
      const id=req.body.id
      const spec_item=await Products.findByIdAndUpdate(id,{$set:payload},{new:true})
      if(spec_item){
        await spec_item.save()
        return res.send({message:"Successfully Edited the Product"})
      }
      else{
        return res.status(404).send({message:"Error in editing"})
      }

}

export const deleteProducts=async(req,res)=>{
  const id=req.params.id
  const data=await Products.findByIdAndDelete(id)
  if(data){
    return res.send({message:"Product Deleted Successfully"})
  }
  return res.status(404).send({message:"Error while Deleting"})
}