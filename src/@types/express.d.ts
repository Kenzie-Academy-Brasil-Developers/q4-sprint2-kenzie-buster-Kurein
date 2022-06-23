import { Express } from "express";

import { User } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      email: string;
    }
  }
}
