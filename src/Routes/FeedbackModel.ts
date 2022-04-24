import { model, Schema } from "mongoose";

const feebackSchema = new Schema(
  {
    feedback: String,
    rating: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
export const feedbackModel = model("feedback", feebackSchema);
