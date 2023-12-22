interface Status {
  long: string;
  elapsed: number;
  seconds: string;
}

interface Fixture {
  id: number;
  status: Status;
}

interface League {
  id: number;
  season: number;
}

interface Team {
  id: number;
  goals: number;
}

interface OddsValue {
  value: string;
  odd: string;
  handicap: string | null;
  main: boolean | null;
  suspended: boolean;
}

interface Odds {
  id: number;
  name: string;
  values: OddsValue[];
}

export interface oddsLiveResponse {
  get: string;
  parameters: { fixture: string };
  errors: any[];
  results: number;
  paging: { current: number; total: number };
  response: {
    fixture: Fixture;
    league: League;
    teams: { home: Team; away: Team };
    status: { stopped: boolean; blocked: boolean; finished: boolean };
    update: string;
    odds: Odds[];
  }[];
}
