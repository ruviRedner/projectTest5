import { Request, Response } from 'express';
import loginDTO from '../interfaces/Ilogin';
import { loginToSystem } from '../services/authService';

export const login = async (
  req: Request<any, any, loginDTO>,
  res: Response
): Promise<void> => {
  try {
    const token = await loginToSystem(req.body);
    res.cookie('login_token', token);
    res.status(200).json({ token: token.toString() });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ err });
  }
};
