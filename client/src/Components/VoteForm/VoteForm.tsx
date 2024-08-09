import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from "../../store";
import { addVoteAPI, resultForEventAPI } from "../../apis/events";

const VoteForm: React.FC = () => {
  const [state, dispatch] = useContext(EventsContext);

  const [isLoading, setLoading] = useState(false);

  const [result, setResult] = useState({
    id: "",
    name: "",
    suitableDates: [],
  });

  const votedIdStr = localStorage.getItem("voted_ids");
  const votedIds = JSON.parse(votedIdStr || "[]");

  const [formState, setState] = useState({
    votes: [] as string[],
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "votes") {
      if (checked) {
        setState({
          ...formState,
          votes: [...formState.votes, value],
        });
      }
    } else {
      setState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "toggle_loading", payload: true });
    await addVoteAPI(state.selectedEvent?.event?.id || "", formState);
    dispatch({ type: "toggle_loading", payload: false });
    dispatch({ type: "clear_selected_event", payload: false });
    if (votedIdStr) {
      const votedIds = JSON.parse(votedIdStr);
      (votedIds as string[]).push(state.selectedEvent?.event?.id || "");
      localStorage.setItem("voted_ids", JSON.stringify(votedIds));
    } else {
      localStorage.setItem(
        "voted_ids",
        JSON.stringify([state.selectedEvent?.event?.id || ""])
      );
    }
  };

  useEffect(() => {
    const loadResult = async () => {
      setLoading(true);
      const apiResult = await resultForEventAPI(
        state.selectedEvent?.event?.id || ""
      );

      setResult(apiResult);
      setLoading(false);
    };

    if ((votedIds as string[]).includes(state.selectedEvent?.event?.id || "")) {
      loadResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ((votedIds as string[]).includes(state.selectedEvent?.event?.id || "")) {
    return (
      <div className="d-flex bg-body p-4 align-items-center justify-content-center position-relative">
        <button
          type="button"
          className="btn fw-bold position-absolute"
          style={{ top: 2, right: 0 }}
          onClick={() =>
            dispatch({ type: "clear_selected_event", payload: false })
          }
        >
          X
        </button>
        {isLoading ? (
          <i className="fa-solid fa-spin fa-spinner fa-3x"></i>
        ) : (
          <div>
            <h2>{result.name}</h2>
            <div className="d-flex">
              {result.suitableDates.map(
                (d: { date: string; people: string[] }) => {
                  return (
                    <div
                      key={d.date}
                      className="p-3 m-1 rounded border border-2"
                    >
                      <h3>{d.date}</h3>
                      <h3>No Of Votes: {d.people.length}</h3>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      className="bg-body p-5 fs-4 max-vw-50 position-relative"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="btn fw-bold position-absolute"
        style={{ top: 2, right: 0 }}
        onClick={() =>
          dispatch({ type: "clear_selected_event", payload: false })
        }
      >
        X
      </button>
      {state.selectedEvent?.event?.dates?.map((d) => (
        <div
          className="p-2 border border-primary rounded m-1 d-inline-flex align-items-center"
          key={d}
        >
          <input
            className="m-1"
            type="checkbox"
            name="votes"
            value={d}
            style={{ transform: "scale(1.3)" }}
            id={d}
            checked={formState.votes.includes(d)}
            onChange={handleChange}
          />
          <span className="text-primary">{d}</span>
        </div>
      ))}
      <br />
      <label htmlFor="">Enter Your Name:</label>
      <br />
      <input
        name="name"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <br />
      <button className="mt-3 fs-5 btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default VoteForm;
