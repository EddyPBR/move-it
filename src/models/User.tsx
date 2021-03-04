import { Schema, Document, model } from "mongoose";

export interface IUserSchema extends Document {
  accessKey: string;
  name: string;
  image: string;
  level: Number;
  currentExp: Number;
  nextLevelExp: Number;
  challengesCompleted: Number;
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
    required: true,
    default: 0,
  },
  currentExp: {
    type: Number,
    required: true,
    default: 0,
  },
  nextLevelExp: {
    type: Number,
    required: true,
    default: 0,
  },
  challengesCompleted: {
    type: Number,
    required: true,
    default: 0,
  }
});

export default model<IUserSchema>("UserModel", UserSchema);