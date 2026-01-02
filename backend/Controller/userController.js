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
export const getOneUser=async(req,res)=>{
    if(req.logId.id){
        const user=await User.findById(req.logId.id)
    // console.log(user)
    if(user){
        return res.send(user)
    }
    }
    
    return res.send({message:"Failed to fetch the user"})
}

export const addUser=async(req,res)=>{
    const {name,email,password,phonenumber,address}=req.body
    const emailexist=await User.findOne({email})
    if(emailexist){
        return res.status(404).send({message:"User already exist with this email"})
    }
    const hashed = await bcrypt.hash(password,10)
    const added=new User({name,email,password:hashed,phonenumber,address})
    await added.save()
    const id=added._id
    if(added){
        const token=jwt.sign({id},process.env.SECRET_KEY)

        return res.send({data:added,token:token,message:"New user created"})
    }
    return res.status(404).send({message:"Failed to create the user"})
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(email==process.env.ADMIN_ID && password==process.env.ADMIN_PASSWORD){
        console.log("Hi admin")
        const token=jwt.sign({email,isAdmin:true},process.env.ADMIN_SECRET_KEY)
        // console.log(token)
        return res.send({token,isAdmin:true,message:"Welcome Admin!"})
    }
    else{
    const spec_user=await User.findOne({email})
    // console.log(spec_user)
    if(!spec_user){
        return res.status(404).send({message:"Please register first to continue!"})       
    }
    const rehashed=bcrypt.compare(password,spec_user.password)
    // console.log(rehashed,password)
    if(!rehashed){
        return res.status(404).send({message:"Invalid password"})
    }
    const id=spec_user._id
    const token=jwt.sign({id},process.env.SECRET_KEY)        
    

    return res.send({token:token,data:spec_user,message:"Login Success!"})
}
}

export const addToCart=async(req,res)=>{
    const {id}=req.body
    const userId=req.logId.id
    const user=await User.findById(userId)
    if(user){
        // console.log(user)
        const cart=user.cart.find(item=>item.product.toString()==id)
        if(cart){
            cart.quantity+=1
        }
        else{
            user.cart.push({product:id,quantity:1})
        }
        await user.save()
    }
    else{
        return res.send({message:"No user exist"})
    }
    return res.send({message:"Cart fetched successfully",user})
}
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.logId.id;
    const { id, removeAll, clearall } = req.body;

    // 1️⃣ CLEAR ENTIRE CART
    if (clearall) {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { cart: [] } },
        { new: true }
      );

      return res.json({ message: "Cart cleared", user });
    }

    // 2️⃣ REMOVE PRODUCT COMPLETELY (even if quantity > 1)
    if (removeAll) {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: { product: id } } },
        { new: true }
      );

      return res.json({ message: "Item removed", user });
    }

    // 3️⃣ DECREMENT QUANTITY BY 1
    await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.product": id,
      },
      {
        $inc: { "cart.$.quantity": -1 },
      }
    );

    // remove item if quantity <= 0
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { quantity: { $lte: 0 } } } },
      { new: true }
    );

    return res.json({ message: "Quantity updated", user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Cart update failed" });
  }
};


export const editUser=async(req,res)=>{
    const updated=req.body.payload
    const editId=req.body.editId
    const response=await User.findByIdAndUpdate(editId,{$set:updated},{new:true})
    // console.log(response)
    if(!response){
        return res.send({message:"User not found"})
    }
    
    await response.save()
    return res.send({message:"User Data updated Successfully",response})

}

export const deleteUser=async(req,res)=>{
    const id=req.params.id
    const user=await User.findByIdAndDelete(id)
    if(!user){
        return res.send({message:"User not found"})
    }
    return res.send({message:"User deleted successfully"})

}


export const setmyOrders = async (req, res) => {
  try {
    const userId = req.logId.id; // ✅ from auth middleware
    const { paymentId, cart,amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ PUSH EACH CART ITEM AS AN ORDER
    cart.forEach((item) => {
      user.orders.push({
        paymentId,
        product: item.product,
        quantity: item.quantity,
        amount: amount,
      });
    });

    await user.save();
    console.log(user)

    res.status(200).json({
      msg: "Order placed successfully",
      orders: user.orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


export const getmyOrders=async(req,res)=>{
    const id=req.logId
    const user=await User.findById(id.id)
    if(user){
        const ord=user.orders
        return res.send({orderlist:ord,message:"Success"})
    }
    return res.status(404).send({messgae:"Failed to fetch order details"})
}

