import { EventProp } from "../types";
import { handleApi } from "./utils";

// Get all the events
export const getAllEvents = async () => {
  return await handleApi("event/list");
};

// Create a new event
export const createEventAPI = async (payload: EventProp) => {
  return await handleApi(
    "event",
    {
      method: "POST",
    },
    payload
  );
};

// add votes for an event
export const addVoteAPI = async (
  id: string,
  payload: { name: string; votes: string[] }
) => {
  return await handleApi(
    `event/${id}/vote`,
    {
      method: "POST",
    },
    payload
  );
};

// see results for an event
export const resultForEventAPI = async (id: string) => {
  return await handleApi(`event/${id}/results`);
};
