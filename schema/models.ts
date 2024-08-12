import { Schema, model } from "mongoose";

import { EventProps, IUser } from "./types";

const event = new Schema({
  name: {
    type: "string",
    required: true,
  },
  id: {
    type: "string",
    required: true,
  },
  dates: {
    type: [String],
    required: true,
  },
  votes: {
    type: [
      new Schema(
        {
          date: String,
          people: [String],
        },
        { _id: false }
      ),
    ],
    default: [],
  },
});

export const ShuffleEvent = model<EventProps>("Event", event, "events");

// Define the User interface extending Mongoose's Document

// Create the User schema
const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
export const User = model<IUser>("User", UserSchema);
