interface Team {
  id: number;
  name: string;
  logo: string;
}

interface StatisticsItem {
  type: string;
  value: number | string | null;
}

export interface StatisticsResponse {
  get: string;
  parameters: {
    team: string;
    fixture: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    team: Team;
    statistics: StatisticsItem[];
  }[];
}
