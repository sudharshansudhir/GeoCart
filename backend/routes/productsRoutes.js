import express from "express"
import {addProducts,getProducts,deleteProducts,editProducts} from "../Controller/productsController.js"

const router=express.Router()

router.get("/",getProducts)
router.post("/add",addProducts)
router.patch("/edit",editProducts)
router.delete("/delete",deleteProducts)

export default router