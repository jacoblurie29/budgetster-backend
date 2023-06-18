import { ApolloServer } from "@apollo/server";

import mongoose from "mongoose";
import connectToMongoDB from "../config/mongodb.config";
import MonetaryItem from "../models/monetaryItem.model";
import monetaryItem from "../models/monetaryItem.model";
import { configureApolloServer } from "../config/apolloServer.config";

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
    }

    type Mutation {
        createMonetaryItem(monetaryItem: MonetaryItemInput): MonetaryItem
        updateMonetaryItem(_id: String!, monetaryItem: MonetaryItemInput): MonetaryItem
        deleteMonetaryItem(_id: String!): MonetaryItem
    }
`;

const resolvers = {
  Query: {
    getMonetaryItems: async (_: any, args: { limit: number }) => {
      const monetaryItems = await MonetaryItem.find().limit(args.limit);
      return monetaryItems;
    },
    getMonetaryItem: async (_: any, args: { _id: string }) => {
      const monetaryItemById = await MonetaryItem.findById(args._id);
      return monetaryItemById;
    },
  },
  Mutation: {
    createMonetaryItem: async (
      _: any,
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
      _: any,
      args: {
        _id: string;
        monetaryItem: {
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
        args._id,
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
    deleteMonetaryItem: async (_: any, args: { _id: string }) => {
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
