import { Schema, model } from "mongoose";
import type MonetaryItem from "../interfaces/monetaryItem.interface";

const monetaryItemSchema = new Schema<MonetaryItem>({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  repeat: {
    type: Boolean,
    required: true,
  },
  repeatPeriod: {
    type: String,
  },
  repeatEndDate: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

const monetaryItem = model<MonetaryItem>("MonetaryItem", monetaryItemSchema);

export default monetaryItem;
