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
    .get(getProducts)   // listo
    .post(postProduct)  // LISTO

productsRouter
  .route("/categories/:catId/products/:prodId")
    .put(validateCategoryId, updateProduct)       //listo
    .delete(validateCategoryId, deleteProduct)    // listo
    .get(validateCategoryId, getProductById)      // listo