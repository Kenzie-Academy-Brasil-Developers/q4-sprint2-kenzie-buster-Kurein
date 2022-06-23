import { Response, Request } from "express";
import userService from "../services/user.service";

class UserController {
  createUserController = async (req: Request, res: Response) => {
    const user = await userService.createUserService(req);

    return res.status(user.status).json(user.message);
  };

  loginController = async (req: Request, res: Response) => {
    const token = await userService.loginService(req);

    return res.status(token.status).json(token.message);
  };
}

export default new UserController();
