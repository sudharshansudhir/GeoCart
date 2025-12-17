import express from "express"
import productsController from "../Controller/productsController.js"

const router=express.Router()

router.get("/",productsController)

export default router