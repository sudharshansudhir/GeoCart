import express  from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config() 

const PORT=process.env.PORT || 5000
const app=express()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB is Connected"))
.catch((e)=>{
    console.log("Error in connecting to DB")
})

import userRoutes from "./routes/userRoutes.js"



app.get("/",(req,res)=>{
    res.send("Hello From Server")
})

app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
})