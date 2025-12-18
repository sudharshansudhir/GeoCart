import express from "express"
import {addUser,getUser,deleteUser,editUser,loginUser} from "../Controller/userController.js"

const router=express.Router()

router.get("/",getUser)
router.post("/add",addUser)
router.post("/login",loginUser)
router.patch("/edituser",editUser)
router.delete("/deleteuser",deleteUser)

export default router