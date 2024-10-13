import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import RequestWithUser from "../interfaces/requestWithUser";
import TokenPayloadDTO from "../interfaces/tokenPayloed";

const verifyUser = async (
  roll: string,
  req: RequestWithUser | Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.login_token;
    if (!token) {
      res.status(401).json({
        err: true,
        message: "Token is missing, please log in again",
        data: null,
      });
      return;
    }

    console.log(token);
    const payload: TokenPayloadDTO = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as TokenPayloadDTO;
    (req as RequestWithUser).user = payload;
    if (payload.roll !== roll) {
      res.status(403).json({
        err: true,
        message: "You are not authorized to access this resource",
        data: null,
      });
      return;
    }
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        err: true,
        message: "Token expiered, please log in again",
        data: err,
      });
    } else {
      res.status(400).json({
        err: true,
        message: "Token is missing or curropted",
        data: err,
      });
    }
  }
};

export default verifyUser;
