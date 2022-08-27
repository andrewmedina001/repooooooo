import { Router } from "express";
import { 
  getItems, 
  postItem,
  deleteItem, 
  updateItem,
} from "../controllers/carts.controllers.js";
import { validateToken } from "../utils/tokenvalidator.js";

export const cartsRouter = Router()

cartsRouter
  .route("/cart")
    .all(validateToken)
      .get(getItems)
      .post(postItem)

cartsRouter
  .route("/cart/:itemId")
    .all(validateToken)
      .delete(deleteItem)
      .put(updateItem)