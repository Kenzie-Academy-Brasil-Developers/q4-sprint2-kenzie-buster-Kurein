import { Request } from "express";
import { brotliDecompressSync } from "zlib";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/cart.entity";
import { Stock } from "../entities/stock.entity";
import { User } from "../entities/user.entity";

class CartService {
  payCartService = async (req: Request) => {
    const cartRepo = AppDataSource.getRepository(Cart);
    const userRepo = AppDataSource.getRepository(User);
    const stockRepo = AppDataSource.getRepository(Stock);

    const user = await userRepo.findOneBy({ email: req.email });

    if (!user) {
      return { status: 404, message: { message: "User not found" } };
    }

    const cartList = await cartRepo.find();

    const cartListFiltered = cartList.filter(
      (cart) => cart.user.id === user.id
    );

    if (!cartListFiltered) {
      return { status: 404, message: { message: "Cart not found" } };
    }

    for (let i = 0; i < cartListFiltered.length; i++) {
      const stock = await stockRepo.findOneBy({
        id: cartListFiltered[i].dvd.stock.id,
      });

      if (!stock) {
        return { status: 404, message: { message: "Stock not found" } };
      }

      await cartRepo.update(cartListFiltered[i].id, { paid: true });

      await stockRepo.update(stock.id, {
        quantity:
          stock.quantity - Math.floor(cartListFiltered[i].total / stock.price),
      });
    }

    const newCartList = await cartRepo.find();

    const newCartListFiltered = newCartList.filter(
      (cart) => cart.user.id === user.id
    );

    return { status: 200, message: newCartListFiltered };
  };
}

export default new CartService();
