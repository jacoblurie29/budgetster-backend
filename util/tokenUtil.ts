import { tokenType } from "../types/types";
import * as jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/types";

// take in an _id and return both tokens as an object
export const createTokens = async (_id: string, email: string) => {
  // Create our authJWT
  const authToken = jwt.sign(
    {
      user_id: _id,
      email: email,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "10m",
    }
  );
  // create our refreshJWT
  const refreshToken = jwt.sign(
    {
      user_id: _id,
      email: email,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "5d",
    }
  );

  // return both tokens
  return {
    authToken,
    refreshToken,
  };
};

// take in a token and return the user object if the token is valid or return
export const verifyToken = async (token: string, type: tokenType) => {
  try {
    if (type === tokenType.AUTH) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user as TokenPayload;
    } else if (type === tokenType.REFRESH) {
      const user = jwt.verify(token, process.env.JWT_REFRESH_KEY);
      return user as TokenPayload;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
