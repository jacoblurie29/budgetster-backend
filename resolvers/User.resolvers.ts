import User from "../models/user.model";
import { createTokens, verifyToken } from "../util/tokenUtil";
import { tokenType } from "../types/types";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import type { BudgetsterContext } from "../types/types";

const userResolvers = {
  Query: {
    getUser: async (_: unknown, __: unknown, context: BudgetsterContext) => {
      const user = await User.findById(context.user.user_id).populate(
        "monetaryItems"
      );

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    },
    /**
     * Refresh Token Mutation - Takes in a refresh token and returns a new auth token and refresh token
     *
     * @param refreshTokenInput.refreshToken - Refresh token from the client
     */
    refreshToken: async (
      _: unknown,
      args: {
        refreshTokenInput: {
          refreshToken: string;
        };
      }
    ) => {
      // Verify refresh token
      const decodedRefreshToken = await verifyToken(
        args.refreshTokenInput.refreshToken,
        tokenType.REFRESH
      );

      // Throw error if token is null
      if (!decodedRefreshToken) {
        throw new GraphQLError("Refresh token is invalid.", {
          extensions: {
            code: "REFRESH_TOKEN_INVALID",
          },
        });
      }

      // Check if refresh token matches the one in mongo
      const user = await User.findOne({
        _id: decodedRefreshToken.user_id,
      });

      // Throw error if user does not exist
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }

      // Check if refresh token matches the one in mongo
      if (user.refreshToken !== args.refreshTokenInput.refreshToken) {
        throw new GraphQLError("Refresh token is invalid.", {
          extensions: {
            code: "REFRESH_TOKEN_INVALID",
          },
        });
      }

      const { authToken, refreshToken } = await createTokens(
        user._id.toString(),
        user.email
      );

      // Attach token to user model
      user.authToken = authToken;
      user.refreshToken = refreshToken;

      // Save user
      await user.save();

      // Return user
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authToken: user.authToken,
        refreshToken: user.refreshToken,
      };
    },
  },
  Mutation: {
    registerUser: async (
      _: unknown,
      args: {
        registerInput: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
      }
    ) => {
      // see if old user exists with email
      const oldUser = await User.findOne({ email: args.registerInput.email });

      // Throw error
      if (oldUser) {
        throw new GraphQLError(
          "User already exists with that email: " + args.registerInput.email,
          {
            extensions: {
              code: "USER_ALREADY_EXISTS",
            },
          }
        );
      }

      // Encrypt password
      const encryptedPassword = await bcrypt.hash(
        args.registerInput.password,
        10
      );

      // Build mongo user model
      const newUser = new User({
        firstName: args.registerInput.firstName,
        lastName: args.registerInput.lastName,
        email: args.registerInput.email.toLowerCase(),
        password: encryptedPassword,
      });

      const { authToken, refreshToken } = await createTokens(
        newUser._id.toString(),
        newUser.email
      );

      // Attach token to user model
      newUser.authToken = authToken;
      newUser.refreshToken = refreshToken;

      // Save user
      await newUser.save();

      console.log(newUser);

      return {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        authToken: newUser.authToken,
        refreshToken: newUser.refreshToken,
      };
    },
    loginUser: async (
      _: unknown,
      args: {
        loginInput: {
          email: string;
          password: string;
        };
      }
    ) => {
      // Find user in mongo
      const user = await User.findOne({
        email: args.loginInput.email,
      }).populate("monetaryItems");

      console.log(user);

      // Throw error
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }

      // Check password
      const isPasswordCorrect = await bcrypt.compare(
        args.loginInput.password,
        user.password
      );

      // Throw error
      if (!isPasswordCorrect) {
        throw new GraphQLError(
          "Password is incorrect for user: " + args.loginInput.email,
          {
            extensions: {
              code: "PASSWORD_INCORRECT",
            },
          }
        );
      }

      const { authToken, refreshToken } = await createTokens(
        user._id.toString(),
        user.email
      );

      // Attach token to user model
      user.authToken = authToken;
      user.refreshToken = refreshToken;

      // Save user
      await user.save();

      // Return user
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authToken: user.authToken,
        refreshToken: user.refreshToken,
        monetaryItems: user.monetaryItems,
      };
    },
  },
};

export default userResolvers;
