import express from "express"
import {addUser,getUser,getOneUser,deleteUser,editUser,loginUser, addToCart} from "../Controller/userController.js"
import { isauth } from "../middleware/authMiddleware.js"

const router=express.Router()

router.get("/",getUser)
router.get("/user",isauth,getOneUser)
router.post("/add",addUser)
router.post("/login",loginUser)
router.patch("/edituser",isauth,editUser)
router.patch("/cart",isauth,addToCart)
router.delete("/deleteuser",deleteUser)

export default router