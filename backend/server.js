import express  from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config() 

import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productsRoutes.js"

const PORT=process.env.PORT || 5000
const app=express()
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

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
})