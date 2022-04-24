import { model, Schema } from "mongoose";

const signupSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    favourites: [String],
    cart: [String],
    buy: [String],
    sell: [String],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export const signupModel = model("Signup", signupSchema, "Login");
