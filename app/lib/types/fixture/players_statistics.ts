interface PlayerStatisticsGames {
  minutes: number;
  number: number;
  position: string;
  rating: string;
  captain: boolean;
  substitute: boolean;
}

interface PlayerStatisticsShots {
  total: number;
  on: number;
}

interface PlayerStatisticsGoals {
  total: number | null;
  conceded: number;
  assists: number | null;
  saves: number;
}

interface PlayerStatisticsPasses {
  total: number;
  key: number;
  accuracy: string;
}

interface PlayerStatisticsTackles {
  total: number | null;
  blocks: number;
  interceptions: number;
}

interface PlayerStatisticsDuels {
  total: number | null;
  won: number | null;
}

interface PlayerStatisticsDribbles {
  attempts: number;
  success: number;
  past: number | null;
}

interface PlayerStatisticsFouls {
  drawn: number;
  committed: number;
}

interface PlayerStatisticsCards {
  yellow: number;
  red: number;
}

interface PlayerStatisticsPenalty {
  won: number | null;
  commited: number | null;
  scored: number;
  missed: number;
  saved: number;
}

interface PlayerStatistics {
  games: PlayerStatisticsGames;
  offsides: number | null;
  shots: PlayerStatisticsShots;
  goals: PlayerStatisticsGoals;
  passes: PlayerStatisticsPasses;
  tackles: PlayerStatisticsTackles;
  duels: PlayerStatisticsDuels;
  dribbles: PlayerStatisticsDribbles;
  fouls: PlayerStatisticsFouls;
  cards: PlayerStatisticsCards;
  penalty: PlayerStatisticsPenalty;
}

interface Player {
  id: number;
  name: string;
  photo: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  update: string;
}

interface PlayersStatistics {
  player: Player;
  statistics: PlayerStatistics[];
}

export interface PlayersStatisticsResponse {
  get: string;
  parameters: {
    fixture: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response?: {
    team?: Team;
    players?: PlayersStatistics[];
  }[];
}
