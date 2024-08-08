export interface VoteProp {
  date: string;
  people: string[];
}

export interface EventProps {
  id?: string;
  name?: string;
  dates?: String[];
  votes?: (VoteProp | String)[];
}
