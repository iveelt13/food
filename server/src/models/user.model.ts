import { Schema, model, models, Model } from "mongoose";

export enum UserRoleEnum {
  USER = "User",
  ADMIN = "Admin",
}

type UserSchemaType = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: Schema.Types.ObjectId[];
  ttl: Date;
  isVerified: boolean;
};

const UserSchema = new Schema<UserSchemaType>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
    },
    orderedFoods: [
      { type: Schema.Types.ObjectId, ref: "FoodOrder", required: true },
    ],
    ttl: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel: Model<UserSchemaType> =
  models["User"] || model("User", UserSchema);
