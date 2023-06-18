import mongoose from "mongoose";
import { TimePeriod, MonetaryItemCategory } from "../types/types";

/**
 * @interface MonetaryItem - Interface for a monetary item.
 *
 * @param {string} _id - The unique identifier of the monetary item.
 * @param {string} name - The name of the monetary item.
 * @param {number} value - The value of the monetary item.
 * @param {Date} date - The date of the monetary item.
 * @param {boolean} repeat - The repeat status of the monetary item.
 * @param {TimePeriod} repeatPeriod - (optional) The repeat period of the monetary item (weekly, monthly, yearly).
 * @param {Date} repeatEndDate - (optional) The repeat end date of the monetary item.
 * @param {MonetaryItemCategory} type - The type of the monetary item (income, expense, savings, investment).
 */
interface MonetaryItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  value: number;
  date: Date;
  repeat: boolean;
  repeatPeriod?: TimePeriod;
  repeatEndDate?: Date;
  type: MonetaryItemCategory;
}

export default MonetaryItem;
