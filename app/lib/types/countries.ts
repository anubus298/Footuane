export interface CountriesResponse {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: any;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Country[];
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}
