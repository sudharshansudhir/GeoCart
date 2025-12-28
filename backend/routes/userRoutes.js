import express from "express"
import {addUser,getUser,getOneUser,deleteUser,editUser,loginUser, addToCart, removeFromCart} from "../Controller/userController.js"
import { isauth } from "../middleware/authMiddleware.js"

const router=express.Router()

router.get("/",getUser)
router.get("/user",isauth,getOneUser)
router.post("/add",addUser)
router.post("/login",loginUser)
router.patch("/edit",isauth,editUser)
router.patch("/add/cart",isauth,addToCart)
router.patch("/remove/cart",isauth,removeFromCart)
router.delete("/delete/:id",isauth,deleteUser)

export default router