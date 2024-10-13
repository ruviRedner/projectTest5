import { Request, Response } from "express";
import { CreateNewUser } from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await CreateNewUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const getStudent = async (req: Request, res: Response) => {};
