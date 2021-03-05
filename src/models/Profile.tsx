import { Schema, Document, model, models } from "mongoose";

export interface IProfileSchema extends Document {
  name: string;
  image: string;
  level: Number;
  currentExp: Number;
  nextLevelExp: Number;
  totalExp: Number;
  challengesCompleted: Number;
}

const ProfileSchema = new Schema({
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
    default: 1,
  },
  currentExp: {
    type: Number,
    required: true,
    default: 0,
  },
  nextLevelExp: {
    type: Number,
    required: true,
    default: 64,
  },
  totalExp: {
    type: Number,
    required: true,
    default: 0,
  },
  challengesCompleted: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default models.Profile ||
  model<IProfileSchema>("Profile", ProfileSchema);
