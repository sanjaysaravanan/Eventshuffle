import { Schema, model } from "mongoose";

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

export const ShuffleEvent = model("Event", event, "events");
