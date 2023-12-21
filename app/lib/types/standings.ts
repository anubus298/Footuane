interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Goals {
  for: number;
  against: number;
}

interface TeamStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

export interface StandingsTeam {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: TeamStats;
  home: TeamStats;
  away: TeamStats;
  update: string;
}

interface StandingsLeague {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: [StandingsTeam[]];
  };
}

export interface StandingsResponse {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: StandingsLeague[];
}
