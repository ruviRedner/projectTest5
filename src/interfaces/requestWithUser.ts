import { Request } from "express";
import tokenPayloed from "./tokenPayloed"

export default interface RequestWithUser extends Request{
    user:tokenPayloed
}