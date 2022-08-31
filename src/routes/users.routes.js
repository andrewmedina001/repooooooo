import { Router } from "express";
import { 
  getUsers, 
  postUser, 
  validateUser,
  changePassword,
  login,
  profile,
} from "../controllers/users.controllers.js";
import { validateToken } from "../utils/tokenvalidator.js";

export const usersRouter = Router()

usersRouter
  .route("/users")
    .get(getUsers)//listo
    .post(postUser)//listo

usersRouter.post("/validate-user", validateUser);//listo
usersRouter.post("/change-password", changePassword); //listo
usersRouter.post("/login", login);  // listo
usersRouter.get("/profile", validateToken, profile); //listo