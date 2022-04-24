import { model, Schema } from "mongoose";
import { signupModel } from "./AuthModel";

const sellCarSchema = new Schema(
  {
    sellerId: { type: Schema.Types.ObjectId, required: true, ref: signupModel },
    sellStatus: { type: Boolean, required: true },
    address: String,
    brand: { type: String, required: true },
    description: String,
    fuel: String,
    imageUrl: String,
    mobileNo: Number,
    model: String,
    price: Number,
    run: Number,
    sellerName: String,
    type: String,
    year: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export const sellModel = model("Sell", sellCarSchema, "Sell");
