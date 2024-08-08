import express from "express";
import {
  createAnEvent,
  getAllEvents,
  getAnEvent,
  getEventResults,
  voteForAnEvent,
} from "../contollers/events";

const eventRouter = express.Router();

// Get all the events available
eventRouter.get("/list", getAllEvents);

// Get a single event with id
eventRouter.get("/:id", getAnEvent);

// get results for a particular event
eventRouter.get("/:id/results", getEventResults);

// Vote for a single event with Id
eventRouter.post("/:id/vote", voteForAnEvent);

// Create an event
eventRouter.post("/", createAnEvent);

export default eventRouter;
