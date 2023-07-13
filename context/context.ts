import { ApolloError } from "apollo-server-errors";
import * as jwt from "jsonwebtoken";
import type { BudgetsterContext } from "../types/types";

const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      console.log("✅ [AUTH]: User is authenticated - " + JSON.stringify(user));
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req }) => {
  if (req.body.operationName === "IntrospectionQuery") {
    // console.log('blocking introspection query..');
    return {} as BudgetsterContext;
  }
  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === "RegisterUser" ||
    req.body.operationName === "LoginUser" ||
    req.body.operationName === "RefreshToken"
  ) {
    console.log(
      "✅ [LOGIN/REG]: allowing register, login, and refresh queries to pass without token"
    );
    return {} as BudgetsterContext;
  }

  // get the user token from the headers
  const token = req.headers.authorization || "";

  // try to retrieve a user with the token
  const user = await getUser(token);

  if (!user) {
    throw new ApolloError(
      "User is not Authenticated",
      "USER_NOT_AUTHENTICATED"
    );
  }

  // add the user to the context
  return { user } as BudgetsterContext;
};

export default context;
