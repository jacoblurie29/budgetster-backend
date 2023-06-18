import { Schema, model } from "mongoose";
import MonetaryItem from "../interfaces/monetaryItem.interface";

const monetaryItemSchema = new Schema<MonetaryItem>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
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
    type: Date,
  },
  type: {
    type: String,
    required: true,
  },
});

const monetaryItem = model<MonetaryItem>(
  "MonetaryItemModel",
  monetaryItemSchema
);

export default monetaryItem;
