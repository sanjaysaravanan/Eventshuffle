import { createContext } from "react";
import { AppState, EventProp, SelectedEvent, Action, MsgType } from "../types";
import { Dispatch } from "react";

export const initialState = {
  isLoading: false,
  events: [],
  msg: {
    type: "success" as MsgType,
    message: "",
  },
  selectedEvent: {
    open: false,
  },
  openAddForm: false,
};

export const EventsContext = createContext<[AppState, Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const eventReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "load_events":
      return {
        ...state,
        events: [...(action.payload as EventProp[])],
      };
    case "open_popup":
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          open: true,
        } as SelectedEvent,
      };
    case "toggle_add_form":
      return {
        ...state,
        openAddForm: action.payload as boolean,
      };
    case "toggle_loading":
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case "add_new_event":
      return {
        ...state,
        events: [...state.events, action.payload as EventProp],
      };
    case "load_event":
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          open: true,
          event: action.payload as EventProp,
        },
      };
    case "clear_selected_event":
      return {
        ...state,
        selectedEvent: {
          open: false,
        },
      };
    default:
      return state;
  }
};
