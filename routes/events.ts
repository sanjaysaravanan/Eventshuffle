import express, { Request, Response } from "express";
import { Error } from "mongoose";
import { v4 } from "uuid";

import { ShuffleEvent } from "../schema/models";
import { EventProps, VoteProp } from "../schema/types";

const eventRouter = express.Router();

// Get all the events available
eventRouter.get("/list", async (_req: Request, res: Response) => {
  try {
    const events = await ShuffleEvent.find({}, { id: 1, name: 1, _id: 0 });
    res.json(events);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
});

// Get a single event with id
eventRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await ShuffleEvent.findOne(
      { id: req.params.id },
      { _id: 0, __v: 0 }
    );
    res.json(event);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
});

// get results for a particular event
eventRouter.get("/:id/results", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const event: unknown = (
      await ShuffleEvent.findOne(
        { id: req.params.id },
        { id: 1, name: 1, votes: 1, _id: 0 }
      )
    )?.toObject();

    let maxLen = 0;

    const { votes = [], name = "", id = "" } = event as EventProps;

    votes.forEach((vote) => {
      let noOfVotes = (vote as VoteProp).people.length;
      if (maxLen <= noOfVotes) {
        maxLen = noOfVotes;
      }
    });

    res.json({
      name,
      id,
      suitableDates: votes.filter(
        (vote) => (vote as VoteProp).people.length === maxLen
      ),
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
});

// Vote for a single event with Id
eventRouter.post("/:id/vote", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const event: unknown = (
      await ShuffleEvent.findOne({ id: req.params.id }, { _id: 0, __v: 0 })
    )?.toObject();

    const { votes: payloadVotes = [], name = "" } = body as EventProps;
    const { votes = [] } = event as EventProps;

    payloadVotes.forEach((v) => {
      const index = votes?.findIndex((vote) => (vote as VoteProp).date === v);

      if (index === -1) {
        votes?.push({
          date: v,
          people: [name],
        } as VoteProp);
      } else {
        const tempVote = { ...votes[index] };
        if (!(tempVote as VoteProp).people.includes(name)) {
          (tempVote as VoteProp).people.push(name);
          votes[index] = tempVote;
        }
      }
    });

    await ShuffleEvent.updateOne({ id: req.params.id }, { $set: { votes } });

    const resultEvent = (
      await ShuffleEvent.findOne({ id: req.params.id }, { _id: 0, __v: 0 })
    )?.toObject();

    res.json(resultEvent);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
});

// Create an event
eventRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);
    const newEvent = new ShuffleEvent({
      ...body,
      id: v4(),
    });
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    console.error(err);
    if (err instanceof Error.ValidationError) {
      res.status(400).json({ msg: "Please check the event information" });
    } else if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
});

export default eventRouter;
