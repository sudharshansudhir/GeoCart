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
        return res.send({token,isAdmin:true,message:"Welcome Admin!"})
    }
    else{
    const spec_user=await User.findOne({email})
    console.log(spec_user)
    if(!spec_user){
        return res.status(404).send({message:"Please register first to continue!"})       
    }
    const rehashed=bcrypt.compare(password,spec_user.password)
    console.log(rehashed,password)
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
export const removeFromCart=async(req,res)=>{
    const {id}=req.body
    const userId=req.logId.id
    const user=await User.findById(userId)
    if(user){
        // console.log(user)
        const cart=user.cart.find(item=>item.product.toString()==id)
        if(cart){
            
            cart.quantity-=1
            if(cart.quantity<=0){
                user.cart=user.cart.filter(item=>item.product.toString()!==id)
            }
        }
        
        await user.save()
    }
    else{
        return res.send({message:"No user exist"})
    }
    return res.send({message:"Cart fetched successfully",user})
}

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
