import express from "express"
import {addProducts,getProducts,deleteProducts,toggleStock, editProducts} from "../Controller/productsController.js"
import upload from "../middleware/multer.js";
import { isadminauth } from "../middleware/authMiddleware.js";

const router=express.Router()

router.get("/",getProducts)
router.post("/add",isadminauth,upload.single("img"),addProducts)
router.patch("/edit/:id",isadminauth,toggleStock)
router.patch("/edit",isadminauth,editProducts)
router.delete("/delete/:id",isadminauth,deleteProducts)

export default router