"use client";
import Games_table from "../components/games_table";
import Main_img from "../components/main_img";
import { fixtureResponse, FixturesData } from "../lib/types/fixture";
import { StandingsResponse } from "../lib/types/standings";
import { TopScorersResponse } from "../lib/types/topScorers";

interface Props {
  standings: StandingsResponse;
  live: fixtureResponse;
  fixtures: fixtureResponse;
  fixtures_upcoming: fixtureResponse;
  topScorers: TopScorersResponse;
}

function Main(props: Props) {
  return (
    <div className="w-full">
      <Main_img />
      <Games_table
        direction="left"
        fixtures={props.live.response}
        standings={props.standings.response[0].league.standings[0]}
        type="live"
      />
      <Games_table
        direction="right"
        fixtures={props.fixtures_upcoming.response}
        type="Upcoming"
        topScorers={props.topScorers.response}
      />
      <Games_table
        direction="left"
        fixtures={props.fixtures.response}
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
