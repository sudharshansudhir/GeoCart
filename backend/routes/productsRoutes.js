import express from "express"
import {addProducts,getProducts,deleteProducts,toggleStock} from "../Controller/productsController.js"
import upload from "../middleware/multer.js";

const router=express.Router()

router.get("/",getProducts)
router.post("/add",upload.single("img"),addProducts)
router.patch("/edit/:id",toggleStock)
router.delete("/delete",deleteProducts)

export default router