import { Router } from "express";
import dvdController from "../controllers/dvd.controller";
import verifyAdmMiddleware from "../middlewares/verifyAdm.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

const route = Router();

const dvdsRoutes = () => {
  route.get("", dvdController.getAllDvdController);

  route.post(
    "/register",
    verifyAdmMiddleware,
    dvdController.createDvdController
  );

  route.post(
    "/buy/:dvd_id",
    verifyTokenMiddleware,
    dvdController.buyDvdController
  );

  return route;
};

export default dvdsRoutes;
