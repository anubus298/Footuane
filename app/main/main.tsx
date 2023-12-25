"use client";
import Games_table from "../components/games_table";
import Highlights from "../components/highlights";
import { fixtureResponse, FixturesData } from "../lib/types/fixture/fixture";
import { ScoreBatResponse } from "../lib/types/scoreBat";
import { StandingsResponse } from "../lib/types/standings";
import { TopScorersResponse } from "../lib/types/topScorers";

interface Props {
  standings?: StandingsResponse;
  live?: fixtureResponse;
  videos?: ScoreBatResponse;
  fixtures?: fixtureResponse;
  fixtures_upcoming?: fixtureResponse;
  topScorers?: TopScorersResponse;
}

function Main(props: Props) {
  return (
    <div className="w-full mt-4">
      <Highlights videos={props?.videos?.response} />
      <Games_table
        fixtures={props?.live?.response}
        direction="left"
        type="live"
        standings={{
          id: props?.standings?.response?.[0]?.league?.id,
          name: props?.standings?.response?.[0]?.league?.name,
          standings: props?.standings?.response?.[0]?.league?.standings[0],
        }}
      />
      <Games_table
        direction="left"
        fixtures={props?.fixtures_upcoming?.response}
        type="Upcoming"
        topScorers={props?.topScorers?.response}
      />
      <Games_table
        direction="left"
        fixtures={props?.fixtures?.response}
        type="Past"
      />
       
    </div>
  );
}


function divideByTime(input: FixturesData[]): DivideByTime {
  let past: FixturesData[] = [],
    upcoming: FixturesData[] = [];
  const now = new Date();
  const cleaned = RemoveShitLeague(input);
  cleaned.forEach((item) => {
    let date = new Date(item.fixture.date);
    if (now.getTime() - date.getTime() >= 0) {
      upcoming.push(item);
    } else {
      past.push(item);
    }
  });
  return {
    upcoming: past,
    past: upcoming,
  };
}



interface DivideByTime {
  upcoming: FixturesData[];
  past: FixturesData[];
}
function RemoveShitLeague(input: FixturesData[]): FixturesData[] {
  let mimic = [...input];
  mimic = mimic.filter((item) => {
    return item.league.id !== 383;
  });
  return mimic;
}
export default Main;
