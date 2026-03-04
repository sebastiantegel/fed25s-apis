import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { UserDTO } from "../models/UserDTO.mjs";
import User from "../models/UserSchema.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["login"];

    if (!token) {
      res.status(401).send("You are not logged in");
    } else {
      const user = jwt.decode(token);

      if (!user) {
        res.status(401).send("You are not logged in");
      } else {
        const foundUser = await User.findOne({
          email: (user as UserDTO).email,
        });

        if (foundUser) {
          next();
        } else {
          res.status(403).send("Impersonating a user are we???");
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).send("You are not logged in");
  }
};
