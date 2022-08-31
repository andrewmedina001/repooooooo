import { Router } from "express";
import { 
  getCategories, 
  postCategory, 
  updateCategory,
  deleteCategory,
  getCategoryById
} from "../controllers/categories.controllers.js";

export const categoriesRouter = Router()

categoriesRouter
  .route("/categories")
    .get(getCategories)   //listo
    .post(postCategory)   //listo

categoriesRouter
  .route("/categories/:id") 
    .put(updateCategory)      //  listo
    .delete(deleteCategory)   //  No es funcional por que lo impiden las llaves foraneas.
    .get(getCategoryById)     //  listo