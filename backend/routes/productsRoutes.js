import express from "express"
import {addProducts,getProducts,deleteProducts,toggleStock} from "../Controller/productsController.js"

const router=express.Router()

router.get("/",getProducts)
router.post("/add",addProducts)
router.patch("/edit/:id",toggleStock)
router.delete("/delete",deleteProducts)

export default router