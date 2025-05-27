import { Schema, model, models, Model } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type FoodOrderItemsSchemaType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type FoodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItemsSchemaType[];
  status: FoodOrderStatusEnum;
};

const FoodOrderItemsSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: "food", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrderSchemaType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemsSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<FoodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", FoodOrderSchema);
