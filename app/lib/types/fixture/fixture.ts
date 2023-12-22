interface FixtureCoverage {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

interface SeasonCoverage {
  fixtures: FixtureCoverage;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: SeasonCoverage;
}

interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface FootballLeague {
  league: League;
  country: Country;
  seasons: Season[];
}

export interface ApiResponse {
  get: string;
  parameters: any[]; // Adjust this based on the actual type of parameters
  errors: any[]; // Adjust this based on the actual type of errors
  results: number;
  paging: { current: number; total: number };
  response: FootballLeague[];
}
interface FixturePeriods {
  first: number;
  second: number | null;
}

interface FixtureVenue {
  id: number;
  name: string;
  city: string;
}

interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number;
}

interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: FixturePeriods;
  venue: FixtureVenue;
  status: FixtureStatus;
}

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface TeamInfo {
  id: number;
  name: string;
  logo: string;
  winner: any; // Adjust this based on the actual type
}

interface FixtureTeams {
  home: TeamInfo;
  away: TeamInfo;
}

interface FixtureGoals {
  home: number;
  away: number;
}

interface FixtureScore {
  extratime: any; // Adjust this based on the actual type
  fulltime: any; // Adjust this based on the actual type
  halftime: any; // Adjust this based on the actual type
  penalty: any; // Adjust this based on the actual type
}

interface FixtureEvents {
  // Adjust this based on the actual type
}

export interface FixturesData {
    fixture: Fixture;
    league: LeagueInfo;
    teams: FixtureTeams;
    goals: FixtureGoals;
    score: FixtureScore;
    events: FixtureEvents;
  }

export interface fixtureResponse {
  get: string;
  parameters: {
    live: string;
    league: string;
    season: string;
    status: string;
  };
  errors: any[]; // Adjust this based on the actual type
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: FixturesData[];
}


