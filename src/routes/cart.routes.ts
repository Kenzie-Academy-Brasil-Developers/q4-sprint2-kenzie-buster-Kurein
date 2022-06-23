import { Router } from "express";

const route = Router();

const cartRoutes = () => {
  route.put("/pay");

  return route;
};

export default cartRoutes;
