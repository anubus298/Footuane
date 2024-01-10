"use client";
import Games_table from "./games_table";
import Highlights from "./highlights";
import { fixtureResponse, FixtureData } from "../lib/types/fixture/fixture";
import { ScoreBatResponse } from "../lib/types/scoreBat";
import { StandingsResponse } from "../lib/types/standings";
import { TopResponse } from "../lib/types/topScorers";

interface Props {
  standings?: StandingsResponse;
  live?: fixtureResponse;
  videos?: ScoreBatResponse;
  fixtures?: fixtureResponse;
  fixtures_upcoming?: fixtureResponse;
  topScorers?: TopResponse;
}

function Main(props: Props) {
  return (
    <div className="w-full mt-4">
      <div className="flex flex-col items-center justify-center w-full h-[90vh] overflow-hidden select-none">
        <h1 className="font-extrabold text-7xl md:text-9xl text-primary-second ">
          FOOTUANE
        </h1>
        <h3 className="text-3xl font-semibold text-white md:text-4xl ">
          On The Ball<span className="text-lg">,</span> Always Updated.{" "}
        </h3>
      </div>
      <Highlights videos={props?.videos?.response} />
      <Games_table
        href={"live"}
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
        href={"tomorrow"}
        direction="left"
        fixtures={props?.fixtures_upcoming?.response}
        type="Upcoming"
        topScorers={props?.topScorers?.response}
      />
      <Games_table
        href={"yesterday"}
        direction="left"
        fixtures={props?.fixtures?.response}
        type="Past"
      />
    </div>
  );
}

function divideByTime(input: FixtureData[]): DivideByTime {
  let past: FixtureData[] = [],
    upcoming: FixtureData[] = [];
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
  upcoming: FixtureData[];
  past: FixtureData[];
}
function RemoveShitLeague(input: FixtureData[]): FixtureData[] {
  let mimic = [...input];
  mimic = mimic.filter((item) => {
    return item.league.id !== 383;
  });
  return mimic;
}
export default Main;
