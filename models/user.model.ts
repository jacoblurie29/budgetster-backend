import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  monetaryItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "MonetaryItem",
    },
  ],
});

const User = model("User", userSchema);
export default User;
