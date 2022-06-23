import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities/dvd.entity";
import { Stock } from "../entities/stock.entity";
import { User } from "../entities/user.entity";
import { Cart } from "../entities/cart.entity";

class DvdServices {
  getAllDvdService = async () => {
    const dvdRepo = AppDataSource.getRepository(Dvd);
    const dvds = await dvdRepo.find();

    return { status: 200, message: dvds };
  };

  createDvdService = async ({ body }: Request) => {
    const dvdRepo = AppDataSource.getRepository(Dvd);
    const stockRepo = AppDataSource.getRepository(Stock);
    const dvdCheck = await dvdRepo.findOneBy({ name: body.name });

    if (dvdCheck) {
      await stockRepo.update(dvdCheck.stock.id, {
        quantity: dvdCheck.stock.quantity + body.quantity,
      });

      const newDvd = await dvdRepo.findOneBy({ name: body.name });

      return {
        status: 200,
        message: { message: `${body.name} quantity updated`, body: newDvd },
      };
    }

    const stock = new Stock();
    stock.price = body.price;
    stock.quantity = body.quantity;

    stockRepo.create(stock);
    await stockRepo.save(stock);

    const dvd = new Dvd();
    dvd.duration = body.duration;
    dvd.name = body.name;
    dvd.stock = stock;

    dvdRepo.create(dvd);
    await dvdRepo.save(dvd);

    return { status: 201, message: dvd };
  };

  buyDvdService = async (req: Request) => {
    const userRepo = AppDataSource.getRepository(User);
    const cartRepo = AppDataSource.getRepository(Cart);
    const dvdRepo = AppDataSource.getRepository(Dvd);

    const dvd = await dvdRepo.findOneBy({ id: req.params.dvd_id });
    const user = await userRepo.findOneBy({ email: req.email });

    if (!dvd) {
      return { status: 404, message: { message: "Dvd not found" } };
    }

    if (!user) {
      return { status: 404, message: { message: "User not found" } };
    }

    if (req.body.quantity > dvd.stock.quantity) {
      return {
        status: 422,
        message: {
          message: `current stock: ${dvd.stock.quantity}, received demand was ${req.body.quantity}`,
        },
      };
    }

    const cart = new Cart();
    cart.total = dvd.stock.price * req.body.quantity;
    cart.paid = false;
    cart.dvd = dvd;
    cart.user = user;

    cartRepo.create(cart);
    await cartRepo.save(cart);

    return { status: 200, message: cart };
  };
}

export default new DvdServices();
