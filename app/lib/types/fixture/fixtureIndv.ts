interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number;
  };
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

interface Goal {
  home: number;
  away: number;
}

interface Score {
  halftime: {
    home: number;
    away: number;
  };
  fulltime: {
    home: number;
    away: number;
  };
  extratime: {
    home: null;
    away: null;
  };
  penalty: {
    home: null;
    away: null;
  };
}

interface Event {
  time: {
    elapsed: number;
    extra: null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: string;
  detail: string;
  comments: string | null;
}

interface VenueColors {
  player: {
    primary: string;
    number: string;
    border: string;
  };
  goalkeeper: {
    primary: string;
    number: string;
    border: string;
  };
}

export interface TeamFormation {
  team: {
    id: number;
    name: string;
    logo: string;
    colors: VenueColors;
  };
  formation: string;
  startXI: {
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid: string;
    };
  }[];
  substitutes: {
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid: string;
    };
  }[];
  coach: {
    id: number;
    name: string;
    photo: string;
  };
}

interface Statistics {
  type: string;
  value: string | number | null;
}

export interface TeamStatistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: Statistics[];
}

interface PlayerStatistics {
  games: {
    minutes: number;
    number: number;
    position: string;
    rating: string;
    captain: boolean;
    substitute: boolean;
  };
  offsides: number | null;
  shots: {
    total: number | null;
    on: number | null;
  };
  goals: {
    total: number | null;
    conceded: number | null;
    assists: number | null;
    saves: number | null;
  };
  passes: {
    total: number | null;
    key: number | null;
    accuracy: string;
  };
  tackles: {
    total: number | null;
    blocks: number | null;
    interceptions: number | null;
  };
  duels: {
    total: number | null;
    won: number | null;
  };
  dribbles: {
    attempts: number | null;
    success: number | null;
    past: number | null;
  };
  fouls: {
    drawn: number | null;
    committed: number | null;
  };
  cards: {
    yellow: number;
    red: number;
  };
  penalty: {
    won: number | null;
    commited: number | null;
    scored: number | null;
    missed: number | null;
    saved: number | null;
  };
}

interface Player {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: PlayerStatistics[];
}

interface MatchData {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goal;
  score: Score;
  events: Event[];
  lineups: TeamFormation[];
  statistics: TeamStatistics[];
  players: Player[];
}

export interface FixtureIndvResponse {
  get: string;
  parameters: {
    id: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: MatchData[];
}
