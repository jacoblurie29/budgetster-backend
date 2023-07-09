import User from "../models/user.model";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const userResolvers = {
  Query: {},
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
        throw new ApolloError(
          "User already exists with that email: " + args.registerInput.email,
          "USER_ALREADY_EXISTS"
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

      await newUser.save();

      // Create our JWT (attach to user model)
      const token = jwt.sign(
        {
          _id: newUser._id,
          email: args.registerInput.email,
        },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Attach token to user model
      newUser.token = token;

      console.log(newUser);

      return {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token: newUser.token,
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
      const user = await User.findOne({ email: args.loginInput.email });

      // Throw error
      if (!user) {
        throw new ApolloError(
          "User does not exist with that email: " + args.loginInput.email,
          "USER_DOES_NOT_EXIST"
        );
      }

      // Check password
      const isPasswordCorrect = await bcrypt.compare(
        args.loginInput.password,
        user.password
      );

      // Throw error
      if (!isPasswordCorrect) {
        throw new ApolloError(
          "Password is incorrect for user: " + args.loginInput.email,
          "PASSWORD_INCORRECT"
        );
      }

      // Create our JWT (attach to user model)
      const token = jwt.sign(
        {
          user_id: user._id,
          email: args.loginInput.email,
        },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Attach token to user model
      user.token = token;

      // Return user
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: user.token,
      };
    },
  },
};

export default userResolvers;
