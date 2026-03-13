import { getSession } from "@auth/express";
import Google from "@auth/express/providers/google";
import type { Request, Response, NextFunction } from "express";

export const authSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Sätt res.locals till ett object session
  // session blir resultatet av getSession
  // resultatet av getSession: { email: "", name: "", image: ""}
  res.locals.session = await getSession(req, { providers: [Google] });

  console.log("Session:", res.locals.session);

  // Kör nästa middleware
  next();
};
