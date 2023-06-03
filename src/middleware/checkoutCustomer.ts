import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Role from "../models/role";
import jwt from "jsonwebtoken";

export async function checkCustomerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let tokenstring: any = req.headers.authorization;
  try {
    let verifyObj: any = await jwt.verify(tokenstring, "authen1");
    console.log("chau", verifyObj);
    if (!verifyObj) {
      return res.sendStatus(401);
    }

    let user = await User.findById(verifyObj.user_id);

    if (!user || user.token != tokenstring) {
      return res.sendStatus(401);
    }
    const userRole = await Role.findById(user.role_id);
    if(userRole && userRole.role === "customer"){
        next()
    }

  } catch (error) {
    return res.sendStatus(401);
  }
}