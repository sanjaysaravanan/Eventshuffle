import React, { useContext, useState } from "react";
import { EventsContext } from "../../store";
import { createEventAPI } from "../../apis/events";
import { EventProp } from "../../types";
const EventForm: React.FC = () => {
  const [, dispatch] = useContext(EventsContext);

  const [formState, setState] = useState<{
    dates: string[];
    name: string;
  }>({
    dates: [],
    name: "",
  });

  const removeSelectedEvent = (name: string) => {
    setState({
      ...formState,
      dates: formState.dates.filter((d) => d !== name),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formState.dates.includes(value) && name === "dates") {
      setState({
        ...formState,
        dates: [...formState.dates, value],
      });
    }
    if (name === "name") {
      setState({
        ...formState,
        name: value,
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "toggle_loading", payload: true });
    const { id } = await createEventAPI(formState as EventProp);
    dispatch({ type: "toggle_loading", payload: false });
    dispatch({ type: "toggle_add_form", payload: false });
    dispatch({ type: "add_new_event", payload: { id, ...formState } });
  };

  return (
    <form
      className="bg-body p-4 fs-4 max-vw-50 position-relative"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="btn fw-bold position-absolute"
        style={{ top: 10, right: 10 }}
        onClick={() => dispatch({ type: "toggle_add_form", payload: false })}
      >
        X
      </button>
      <label htmlFor="eventName">Event Name:</label>
      <br />
      <input
        id="eventName"
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="addDate">Select Possible Dates</label>
      <br />
      <input type="date" id="addDate" name="dates" onChange={handleChange} />
      <div className="mt-3">
        {formState.dates.map((date) => {
          return (
            <div
              key={date}
              className="rounded fs-6 text-primary d-inline-flex border border-primary p-2 m-1 align-items-center"
            >
              {date}
              <button
                onClick={() => removeSelectedEvent(date)}
                type="button"
                className="btn rounded-circle btn-outline-primary fw-bold fs-6 mx-1"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary mt-2" type="submit">
        Add New Event
      </button>
    </form>
  );
};

export default EventForm;
