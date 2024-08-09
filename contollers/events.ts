import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { v4 } from "uuid";

import { ShuffleEvent } from "../schema/models";
import { EventProps, VoteProp } from "../schema/types";

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await ShuffleEvent.find(
      {},
      { id: 1, name: 1, dates: 1, _id: 0 }
    );
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
};

export const getAnEvent = async (req: Request, res: Response) => {
  try {
    const event = await ShuffleEvent.findOne(
      { id: req.params.id },
      { _id: 0, __v: 0 }
    );
    if (event) {
      res.json(event);
    } else {
      res.status(404).send({ msg: "Event Not Found" });
    }
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
};

export const getEventResults = async (req: Request, res: Response) => {
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
};

export const createAnEvent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = v4();
    const newEvent = new ShuffleEvent({
      ...body,
      id,
    });
    await newEvent.save();
    res.status(200).json({ id });
  } catch (err) {
    console.error(err);
    if (err instanceof MongooseError.ValidationError) {
      res.status(400).json({ msg: "Please check the event information" });
    } else if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(500)
        .json({ msg: "Something Went Wrong Please Try again Later" });
    }
  }
};

export const voteForAnEvent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const event: unknown = (
      await ShuffleEvent.findOne({ id: req.params.id }, { _id: 0, __v: 0 })
    )?.toObject();

    if (event) {
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
    } else {
      res.status(404).send({ msg: "Event Not Found" });
    }
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
};
