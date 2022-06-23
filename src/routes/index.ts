import { Express } from "express";
import cartRoutes from "./cart.routes";
import dvdsRoutes from "./dvd.routes";
import userRoutes from "./user.routes";

const registerRoutes = (app: Express) => {
  app.use("/api/users", userRoutes());
  app.use("/api/dvds", dvdsRoutes());
  app.use("/api/cart", cartRoutes());
};

export default registerRoutes;
