import { Router } from "express";
import cartController from "../controllers/cart.controller";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

const route = Router();

const cartRoutes = () => {
  route.put("/pay", verifyTokenMiddleware, cartController.payCartController);

  return route;
};

export default cartRoutes;
