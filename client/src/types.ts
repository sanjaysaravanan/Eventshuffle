export interface EventProp {
  name: string;
  id: string;
  dates?: string[];
}

export type MsgType = "success" | "warning" | "error";

interface MsgProp {
  type: MsgType;
  message: string;
}

export type Action = {
  type: string;
  payload: unknown;
};

export interface SelectedEvent {
  open: boolean;
  event?: EventProp;
}

export interface AppState {
  isLoading: boolean;
  events: EventProp[];
  msg: MsgProp;
  selectedEvent?: SelectedEvent;
  openAddForm: boolean;
}
