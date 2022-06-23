import { Router } from "express";

const route = Router();

const dvdsRoutes = () => {
  route.get("");
  route.post("/register");
  route.post("/buy/:dvd_id");

  return route;
};

export default dvdsRoutes;
