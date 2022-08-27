import { Router } from "express";
import { 
  getProducts, 
  postProduct,
  updateProduct,
  deleteProduct,
  getProductById 
} from "../controllers/products.controllers.js";
import { validateCategoryId } from "../validators.js";

export const productsRouter = Router()

productsRouter
  .route("/categories/:id/products")
    .get(getProducts)
    .post(postProduct)

productsRouter
  .route("/categories/:catId/products/:prodId")
    .put(validateCategoryId, updateProduct)
    .delete(validateCategoryId, deleteProduct)
    .get(validateCategoryId, getProductById)