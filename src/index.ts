import connectToMongoDB from "../config/mongodb.config";
import monetaryItem from "../models/monetaryItem.model";
import { configureApolloServer } from "../config/apolloServer.config";
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";

const typeDefs = `#graphql
    type MonetaryItem {
        _id: String!
        name: String!
        value: Float!
        date: String!
        repeat: Boolean!
        repeatPeriod: String
        repeatEndDate: String
        type: String!
    }

    input MonetaryItemInput {
        _id: String
        name: String!
        value: Float!
        date: String!
        repeat: Boolean!
        repeatPeriod: String
        repeatEndDate: String
        type: String!
    }

    type Query {
        getMonetaryItems(limit: Int): [MonetaryItem]
        getMonetaryItem(_id: String!): MonetaryItem
        getMonetaryItemsByType(type: String!): [MonetaryItem]
    }

    type Mutation {
        createMonetaryItem(monetaryItem: MonetaryItemInput): MonetaryItem
        updateMonetaryItem(monetaryItem: MonetaryItemInput): MonetaryItem
        deleteMonetaryItem(_id: String!): MonetaryItem
    }
`;

const resolvers = {
  Query: {
    getMonetaryItems: async (_: unknown, args: { limit: number }) => {
      const monetaryItems = await monetaryItem.find().limit(args.limit);
      return monetaryItems;
    },
    getMonetaryItem: async (_: unknown, args: { _id: string }) => {
      const monetaryItemById = await monetaryItem.findById(args._id);
      return monetaryItemById;
    },
    getMonetaryItemsByType: async (_: unknown, args: { type: string }) => {
      const monetaryItemsByType = await monetaryItem.find({ type: args.type });
      return monetaryItemsByType;
    },
  },
  Mutation: {
    createMonetaryItem: async (
      _: unknown,
      args: {
        monetaryItem: {
          name: string;
          value: number;
          date: Date;
          repeat?: boolean;
          repeatPeriod?: string;
          repeatEndDate: Date;
          type: string;
        };
      }
    ) => {
      const newMonetaryItem = new monetaryItem({
        _id: new mongoose.Types.ObjectId(),
        name: args.monetaryItem.name,
        value: args.monetaryItem.value,
        date: args.monetaryItem.date,
        repeat: args.monetaryItem.repeat,
        repeatPeriod: args.monetaryItem.repeatPeriod,
        repeatEndDate: args.monetaryItem.repeatEndDate,
        type: args.monetaryItem.type,
      });
      await newMonetaryItem.save();
      return newMonetaryItem;
    },
    updateMonetaryItem: async (
      _: unknown,
      args: {
        monetaryItem: {
          _id: string;
          name: string;
          value: number;
          date: Date;
          repeat: boolean;
          repeatPeriod?: string;
          repeatEndDate: Date;
          type: string;
        };
      }
    ) => {
      const updatedMonetaryItem = await monetaryItem.findByIdAndUpdate(
        args.monetaryItem._id,
        {
          name: args.monetaryItem.name,
          value: args.monetaryItem.value,
          date: args.monetaryItem.date,
          repeat: args.monetaryItem.repeat,
          repeatPeriod: args.monetaryItem.repeatPeriod,
          repeatEndDate: args.monetaryItem.repeatEndDate,
          type: args.monetaryItem.type,
        },
        { new: true }
      );
      return updatedMonetaryItem;
    },
    deleteMonetaryItem: async (_: unknown, args: { _id: string }) => {
      const deletedMonetaryItem = await monetaryItem.findByIdAndDelete(
        args._id
      );
      return deletedMonetaryItem;
    },
  },
};

connectToMongoDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

configureApolloServer(server);
