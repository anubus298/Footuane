"use client";

import Image from "next/image";
import { StandingsResponse } from "@/app/lib/types/standings";
import { TopResponse } from "@/app/lib/types/topScorers";
import TopScorersTable from "@/app/components/topScorers_table";
import Competition_table from "@/app/components/competition_table";
import Competitions_matches from "./competitions_matches";
import { fixtureResponse } from "@/app/lib/types/fixture/fixture";
interface Props {
  leagueId: number;
  standings?: StandingsResponse;
  fixtures: fixtureResponse;
  topScorers: TopResponse;
  latestRound?: string;
  rounds: string[];
  topAssists: TopResponse;
}
function Competitions_main({
  leagueId,
  standings,
  topScorers,
  topAssists,
  rounds,
  fixtures,
  latestRound,
}: Props) {
  return (
    <div className="col-span-12 mx-2 text-white md:col-start-3 md:col-end-11 md:mx-0">
      {CompetitionInfo(latestRound, leagueId, standings)}
      <Competitions_matches
        fixtures={fixtures}
        rounds={rounds}
        latestRound={latestRound}
      />
      <div className="w-full mb-4">
        <div className="flex flex-col gap-4">
          {standings?.response[0] &&
            standings.response[0].league.standings.map((stand, index) => {
              return (
                <Competition_table
                  key={index * 45 + 546}
                  standings={stand}
                  type="full"
                />
              );
            })}
        </div>
      </div>
      <div className="w-full mb-4">
        <h3 className="mb-4 text-3xl font-semibold text-primary-second">
          Top Scorers
        </h3>
        <TopScorersTable type="full" topScorers={topScorers.response} />
      </div>
      <div className="w-full mb-4">
        <h3 className="mb-4 text-3xl font-semibold text-primary-second">
          Top Assists
        </h3>
        <TopScorersTable type="full" topScorers={topAssists.response} />
      </div>
    </div>
  );
}

export default Competitions_main;
function CompetitionInfo(
  latestRound: string | undefined,
  leagueId: number,
  standings: StandingsResponse | undefined
) {
  return (
    <div className="grid w-full grid-cols-12 grid-rows-2 py-6 mb-2 bg-primary-first bg-opacity-40 md:grid-rows-1">
      <div className="flex flex-col items-center justify-center col-span-6 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-span-3">
        <p className="text-lg">Current Round :</p>
        <p className="text-lg font-light">{latestRound}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full col-span-12 row-start-1 row-end-2 gap-3 md:col-span-6">
        <div className="size-[100px] flex justify-center items-center bg-white rounded overflow-hidden">
          <Image
            src={`https://media.api-sports.io/football/leagues/${leagueId}.png`}
            width={90}
            height={90}
            className="h-auto"
            alt=""
          />
        </div>
        <h3 className="text-3xl font-semibold">
          {standings?.response[0]?.league?.name}
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center col-span-6 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-span-3">
        {standings?.response[0].league.flag && (
          <Image
            src={standings?.response[0].league.flag}
            height={80}
            width={80}
            alt={standings?.response[0].league.country + " flag"}
          />
        )}
        <p className="text-lg">{standings?.response[0].league.country}</p>
      </div>
    </div>
  );
}
