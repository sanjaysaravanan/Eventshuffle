import React, { useContext, useEffect, useReducer } from "react";

import Event from "./Components/Event/Event";
import { getAllEvents } from "./apis/events";
import { eventReducer, EventsContext, initialState } from "./store";
import EventForm from "./Components/EventForm/EventForm";
import { EventProp } from "./types";
import VoteForm from "./Components/VoteForm/VoteForm";

const Events: React.FC = () => {
  const [state, dispatch] = useContext(EventsContext);

  const voteForEvent = (evt: EventProp) => () => {
    dispatch({ type: "load_event", payload: evt });
  };

  return (
    <div className="p-4 bg-body-secondary min-vh-100">
      <div className="d-flex justify-content-between">
        <h1>List Of all the Events</h1>
        <button
          className="btn btn-info"
          onClick={() => dispatch({ type: "toggle_add_form", payload: true })}
        >
          Add New Event
        </button>
      </div>
      <div className="m-4 flex flex-wrap">
        {state.events.map((evt) => (
          <Event key={evt.id} {...evt} clickFunc={voteForEvent(evt)} />
        ))}
      </div>
      {state.openAddForm && (
        <div className="min-vh-100 d-flex align-items-center justify-content-center min-vw-100 position-fixed top-0 start-0 bg-dark bg-gradient bg-opacity-50">
          <EventForm />
        </div>
      )}
      {state.selectedEvent?.open && (
        <div className="min-vh-100 d-flex align-items-center justify-content-center min-vw-100 position-fixed top-0 start-0 bg-dark bg-gradient bg-opacity-50">
          <VoteForm />
        </div>
      )}
      {state.isLoading && (
        <div className="min-vh-100 d-flex align-items-center justify-content-center min-vw-100 position-fixed top-0 start-0 bg-dark bg-gradient bg-opacity-50">
          <i className="fa-solid fa-spin fa-spinner fa-4x"></i>
        </div>
      )}
    </div>
  );
};

const EventWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    const loadAllEvents = async () => {
      dispatch({ type: "toggle_loading", payload: true });
      const data = await getAllEvents();

      dispatch({ type: "load_events", payload: data });
      dispatch({ type: "toggle_loading", payload: false });
    };

    loadAllEvents();
  }, []);

  return (
    <EventsContext.Provider value={[state, dispatch]}>
      <Events />
    </EventsContext.Provider>
  );
};

export default EventWrapper;
