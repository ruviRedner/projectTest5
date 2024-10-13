import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import payloedDTO from "../interfaces/tokenPayloed";
import loginDTO from "../interfaces/Ilogin";
import userModel from "../models/teacherOrStudentModel";

export const loginToSystem = async (
  userData: loginDTO
): Promise<Error | string> => {
  const { username, password } = userData;

  const user = await userModel.findOne({ username });
  if (!username || !password) {
    return new Error("Username and password is required");
  }

  if (!user) {
    return new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Error("Incorrect password");
  }

  const payload: payloedDTO = {
    id: user._id,
    username: user.username,
    email: user.email,
    roll: user.roll,
  };

  console.log(process.env.TOKEN_SECRET);
  const token: string = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
  console.log(token);

  return token;
};
