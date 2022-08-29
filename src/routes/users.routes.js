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
    .get(getUsers)
    .post(postUser)

usersRouter.post("/validate-user", validateUser);
usersRouter.post("/change-password", changePassword);
usersRouter.post("/login", login);
usersRouter.get("/profile", validateToken, profile);