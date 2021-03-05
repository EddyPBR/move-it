import { Schema, Document, model, models } from "mongoose";

export interface IUserSchema extends Document {
  accessKey?: string;
  name?: string;
  image?: string;
  level?: Number;
  currentExp?: Number;
  nextLevelExp?: Number;
  totalExp?: Number;
  challengesCompleted?: Number;
}

const UserSchema = new Schema({
  accessKey: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  currentExp: {
    type: Number,
    default: 0,
  },
  nextLevelExp: {
    type: Number,
    default: 64,
  },
  totalExp: {
    type: Number,
    default: 0,
  },
  challengesCompleted: {
    type: Number,
    default: 0,
  },
});

export default models.UserModel || model<IUserSchema>("UserModel", UserSchema);
