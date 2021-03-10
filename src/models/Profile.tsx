import { Schema, Document, model, models } from "mongoose";

export interface IProfileSchema extends Document {
  githubId: number;
  login: string;
  name: string;
  image: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

const ProfileSchema = new Schema({
  githubId: {
    type: Number,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
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
    default: 1,
  },
  currentExperience: {
    type: Number,
    required: true,
    default: 1,
  },
  totalExperience: {
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
