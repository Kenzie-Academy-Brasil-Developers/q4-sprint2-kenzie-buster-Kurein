import { Request, Response } from "express";
import dvdServices from "../services/dvd.services";

class DvdController {
  getAllDvdController = async (_: Request, res: Response) => {
    const dvds = await dvdServices.getAllDvdService();

    res.status(dvds.status).json(dvds.message);
  };

  createDvdController = async (req: Request, res: Response) => {
    const dvd = await dvdServices.createDvdService(req);

    res.status(dvd.status).json(dvd.message);
  };

  buyDvdController = async (req: Request, res: Response) => {
    const cart = await dvdServices.buyDvdService(req);

    res.status(cart.status).json(cart.message);
  };
}

export default new DvdController();
