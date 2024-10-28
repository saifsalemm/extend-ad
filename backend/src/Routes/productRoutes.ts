import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getCategories,
    getProduct,
    updateProduct,
} from "../Controllers/productController.js";
import { adminAuth } from "../Middleware/adminAuth.js";

export const productRouter: Router = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/categories", getCategories);
productRouter.get("/:id", getProduct);

productRouter.post("/", adminAuth, createProduct);
productRouter.put("/:id", adminAuth, updateProduct);
productRouter.delete("/:id", adminAuth, deleteProduct);
