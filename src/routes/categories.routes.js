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
    .get(getCategories)
    .post(postCategory)

categoriesRouter
  .route("/categories/:id")
    .put(updateCategory)
    .delete(deleteCategory)
    .get(getCategoryById)