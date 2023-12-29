export interface RoundsResponse {
    get: string;
    parameters: {
      league: string;
      season: string;
    };
    errors: any[]; // Adjust the type based on the actual structure of the errors, if any
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: string[];
  }