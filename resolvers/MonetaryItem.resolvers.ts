import monetaryItem from "../models/monetaryItem.model";
import User from "../models/user.model";
import type { TimePeriod, MonetaryItemCategory } from "../types/types";

const monetaryItemResolvers = {
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
    getUser: async (_: unknown, args: { _id: string }) => {
      const user = await User.findById(args._id);
      return user;
    },
  },
  Mutation: {
    createMonetaryItem: async (
      _: unknown,
      args: {
        monetaryItem: {
          name: string;
          value: number;
          date: string;
          repeat?: boolean;
          repeatPeriod?: string;
          repeatEndDate: string;
          type: string;
        };
      }
    ) => {
      const newMonetaryItem = new monetaryItem({
        name: args.monetaryItem.name,
        value: args.monetaryItem.value,
        date: args.monetaryItem.date,
        repeat: args.monetaryItem.repeat,
        repeatPeriod: args.monetaryItem.repeatPeriod,
        repeatEndDate: args.monetaryItem.repeatEndDate,
        type: args.monetaryItem.type,
      });
      const response = await newMonetaryItem.save();
      console.log(response);
      return newMonetaryItem;
    },
    updateMonetaryItem: async (
      _: unknown,
      args: {
        monetaryItem: {
          _id: string;
          name: string;
          value: number;
          date: string;
          repeat: boolean;
          repeatPeriod?: TimePeriod;
          repeatEndDate?: string;
          type: MonetaryItemCategory;
        };
      }
    ) => {
      const updatedMonetaryItem = await monetaryItem.findById(
        args.monetaryItem._id
      );

      if (updatedMonetaryItem) {
        updatedMonetaryItem.name = args.monetaryItem.name;
        updatedMonetaryItem.value = args.monetaryItem.value;
        updatedMonetaryItem.date = args.monetaryItem.date;
        updatedMonetaryItem.repeat = args.monetaryItem.repeat;
        updatedMonetaryItem.repeatPeriod =
          args.monetaryItem.repeatPeriod || undefined;
        updatedMonetaryItem.repeatEndDate =
          args.monetaryItem.repeatEndDate || undefined;
        updatedMonetaryItem.type = args.monetaryItem.type;
        await updatedMonetaryItem.save();
      }

      return updatedMonetaryItem;
    },
    deleteMonetaryItem: async (_: unknown, args: { _id: string }) => {
      const deletedMonetaryItem = await monetaryItem.findByIdAndDelete(
        args._id
      );
      return deletedMonetaryItem;
    },
    deleteMonetaryItems: async (_: unknown, args: { _ids: string[] }) => {
      const deletedMonetaryItems = await monetaryItem.deleteMany({
        _id: { $in: args._ids },
      });
      return {
        deletedCount: deletedMonetaryItems.deletedCount,
      };
    },
  },
};

export default monetaryItemResolvers;
