"use client";

import { oddsLiveResponse } from "@/app/lib/types/fixture/odds/odds_live";
import { FixtureHandlerResponse } from "../page";
import Lineups from "./sub/lineups";
import Pallete_main from "./sub/pallete_main";
import Statistics from "./sub/statistics";

function Fixture_indv_main({ response }: { response: FixtureHandlerResponse }) {
  return (
    <div className="grid-cols-12 grid grid-rows-2 gap-2">
      <div className="col-span-12 md:col-span-8 row-span-1 flex flex-col gap-2">
        <Pallete_main fixture={response.fixtureResponse} />
        <Statistics
          statistics={response.fixtureResponse.response[0].statistics}
          homeColor={
            response.fixtureResponse.response[0].lineups[0].team.colors.player
              .primary
          }
          awayColor={
            response.fixtureResponse.response[0].lineups[1].team.colors.player
              .primary
          }
        />
      </div>
      <div className="col-span-12 md:col-span-4 row-span-1">
        <Lineups lineups={response.fixtureResponse.response[0].lineups} />
      </div>
    </div>
  );
}

export default Fixture_indv_main;
