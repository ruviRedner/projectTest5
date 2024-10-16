import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import RequestWithUser from '../interfaces/requestWithUser';
import TokenPayloadDTO from '../interfaces/tokenPayloed';



const verifyUser = async (
  req: RequestWithUser | Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.login_token;

    if (!token) {
      return res.status(401).json({
        err: true,
        message: 'Token is missing, please log in again',
        data: null
      });
    }

    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as TokenPayloadDTO;

    (req as RequestWithUser).user = payload;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        err: true,
        message: 'Token expired, please log in again',
        data: err
      });
    }

    return res.status(400).json({
      err: true,
      message: 'Token is invalid or corrupted',
      data: err
    });
  }
};

export default verifyUser;
