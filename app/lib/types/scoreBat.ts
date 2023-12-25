export interface ScoreBatVideo {
    id: string;
    title: string;
    embed: string;
  }
  
  export interface ScoreBatMatch {
    title: string;
    competition: string;
    matchviewUrl: string;
    competitionUrl: string;
    thumbnail: string;
    date: string;
    videos?: ScoreBatVideo[];
  }
  
export  interface ScoreBatResponse {
    response: ScoreBatMatch[];
  }
  