import { MongoClient } from "mongodb";

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // only in the loca

const dbUrl: string = process.env.DBURI || "localhost:27017";

const dbName: string = process.env.DBNAME || "event-shuffle";

// Creating a client instance
const localUrl = `mongodb://${dbUrl}/${dbName}`; // automatically configure the mongo to be connected to a single DB
// Connecting to the asynchronously
const connectViaMongoose = async () => {
  try {
    await mongoose.connect(localUrl);
    console.log("Mongoose Connected Successfully");
  } catch (e) {
    console.log("Error connecting to database", e);
    process.exit(1);
  }
};

export default connectViaMongoose;
