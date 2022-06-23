import { Request, Response } from "express";
import cartServices from "../services/cart.services";

class CartController {
  payCartController = async (req: Request, res: Response) => {
    const cart = await cartServices.payCartService(req);

    res.status(cart.status).json(cart.message);
  };
}

export default new CartController();
