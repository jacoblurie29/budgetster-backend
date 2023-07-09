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
  password: {
    type: String,
    required: true,
  },
  token: {
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
