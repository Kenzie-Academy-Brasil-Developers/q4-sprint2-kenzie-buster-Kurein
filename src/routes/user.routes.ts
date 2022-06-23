import { Router } from "express";

import userControllers from "../controllers/user.controllers";

const route = Router();

const userRoutes = () => {
  route.post("/register", userControllers.createUserController);
  route.post("/login", userControllers.loginController);

  return route;
};

export default userRoutes;
