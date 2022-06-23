import { Request } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";

class UserService {
  createUserService = async ({ body }: Request) => {
    const userRepo = AppDataSource.getRepository(User);
    const userCheck = await userRepo.findOneBy({ email: body.email });

    if (userCheck) {
      return { status: 409, message: { error: "Email already exists" } };
    }

    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.password = await bcrypt.hash(body.password, 8);
    user.isAdm = body.isAdm || false;

    userRepo.create(user);
    await userRepo.save(user);

    const { password, ...userWoPwd } = user;

    return { status: 201, message: userWoPwd };
  };

  loginService = async ({ body }: Request) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email: body.email });

    if (!user) {
      return { status: 404, message: { error: "User not found" } };
    }

    if (!(await user.comparePwd(body.password))) {
      return {
        status: 400,
        message: { error: "Incorrect Credentials" },
      };
    }

    const token = jwt.sign(
      { email: user.email },
      String(process.env.SECRET_KEY),
      { expiresIn: "24h" }
    );

    return { status: 200, message: { access_token: token } };
  };
}

export default new UserService();
