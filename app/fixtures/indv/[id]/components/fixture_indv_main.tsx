"use client";

import { oddsLiveResponse } from "@/app/lib/types/fixture/odds/odds_live";
import { FixtureHandlerResponse } from "../page";
import Empty_Lineups from "./sub/empty/empty_lineups";
import FixtureInfo from "./sub/fixtureInfo";
import HeadToHead from "./sub/head2head";
import Lineups from "./sub/lineups";
import PlayerStatistics from "./sub/playersStatistics";
import Pallete_main from "./sub/pallete_main";
import Predictions from "./sub/predictions";
import Statistics from "./sub/statistics";
import TimeLine from "./sub/timeline";
import Empty_Pallete_main from "./sub/empty/empty_pallete_main";

function Fixture_indv_main({ response }: { response: FixtureHandlerResponse }) {
  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-2 *">
      <div className="flex flex-col col-span-12 row-span-1 gap-2 md:col-span-8 ">
        {response.fixtureResponse && (
          <Pallete_main fixture={response?.fixtureResponse} />
        )}
        {response.fixtureResponse && (
          <FixtureInfo fixture={response?.fixtureResponse} />
        )}
        {response?.fixtureResponse?.response?.[0]?.statistics?.length !== 0 && (
          <Statistics
            players={response?.fixtureResponse?.response?.[0]?.players || []}
            statistics={
              response?.fixtureResponse?.response?.[0]?.statistics || []
            }
            homeColor={
              response.fixtureResponse?.response?.[0]?.lineups?.[0]?.team
                ?.colors?.player?.primary || "ffffff"
            }
            awayColor={
              response.fixtureResponse?.response?.[0]?.lineups?.[1]?.team
                ?.colors?.player?.primary || "ffffff"
            }
          />
        )}
        {response?.fixtureResponse?.response?.[0]?.events.length !== 0 && (
          <TimeLine events={response?.fixtureResponse?.response?.[0]?.events} />
        )}
        <PlayerStatistics
          players={response?.fixtureResponse?.response?.[0]?.players}
        />
        <HeadToHead
          teams={{
            home: {
              name:
                response?.fixtureResponse?.response?.[0]?.teams?.home?.name ||
                "",
              id:
                response?.fixtureResponse?.response?.[0]?.teams?.home?.id || 0,
            },
            away: {
              name:
                response?.fixtureResponse?.response?.[0]?.teams?.away?.name ||
                "",
              id:
                response?.fixtureResponse?.response?.[0]?.teams?.away?.id || 0,
            },
          }}
          headToheads={response.predictionsResponse?.response[0]?.h2h || []}
        />
      </div>
      <div className="col-span-12 row-span-1 md:col-span-4 ">
        {response.fixtureResponse?.response?.[0]?.lineups?.length !==
          undefined &&
          response.fixtureResponse.response[0].lineups[0]?.team?.colors
            ?.player && (
            <Lineups
              lineups={response.fixtureResponse.response[0].lineups}
              homeColor={
                response.fixtureResponse.response[0].lineups[0].team.colors
                  .player
              }
              homeGoalKeeperColor={
                response.fixtureResponse.response[0].lineups[0].team.colors
                  .goalkeeper
              }
              awayColor={
                response.fixtureResponse.response[0].lineups[1]?.team?.colors
                  ?.player
              }
              awayGoalKeeperColor={
                response.fixtureResponse.response[0].lineups[1]?.team?.colors
                  ?.goalkeeper
              }
            />
          )}
        {!response?.fixtureResponse?.response?.[0]?.lineups?.length && (
          <Empty_Lineups />
        )}
        {response.predictionsResponse?.response.length !== 0 && (
          <Predictions
            predictions={response.predictionsResponse || undefined}
          />
        )}
      </div>
    </div>
  );
}

export default Fixture_indv_main;
