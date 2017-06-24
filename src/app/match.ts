

export interface Match {
  id: number;
  season: number;
  city: string;
  date: string;
  team1: string;
  team2: string;
  tossWinner: string;
  tossDecision: string;
  result: string;
  dlApplied: number;
  winner: string;
  winByRuns: number;
  winByWickets: number;
  playerOfMatch: string;
  venue: string;
  umpire1: string;
  umpire2: string;
  umpire3?: any;
}

