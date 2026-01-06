import dotenv from "dotenv"
dotenv.config() 
import express  from "express"
import cors from "cors"
import paymentRoutes from "./routes/payment.js";
import bcrypt from 'bcrypt'
import aiRoutes from "./routes/aiRoutes.js";




import mongoose from "mongoose"


import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productsRoutes.js"


const PORT=process.env.PORT || 3000
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB is Connected"))
.catch((e)=>{
    console.log("Error in connecting to DB",e)
})

app.get("/",(req,res)=>{
    res.send("Hello From Server")
})

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
})