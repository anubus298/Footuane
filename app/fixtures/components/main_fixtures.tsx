"use client";

import { sortedFixturesByleague } from "../page";
import Empty_live_now from "./empty/empty_live";
import Fixtures_game from "./fixture_game";

interface Props {
  live: sortedFixturesByleague;
  tomorrow: sortedFixturesByleague;
  yesterday: sortedFixturesByleague;
}
function Main_fixtures({ live, tomorrow, yesterday }: Props) {
  return (
    <div className="grid grid-cols-12 gap-1 text-white">
      <div className="col-span-2 bg-primary-first bg-opacity-40"></div>
      <div className="col-start-3 col-end-13">
        {Object.keys(live).length !== 0 && (
          <Fixtures_game id={"live"} live={live} type={"Live Now"} />
        )}
        {Object.keys(tomorrow).length === 0 && <Empty_live_now />}
        {Object.keys(tomorrow).length !== 0 && (
          <Fixtures_game
            id={"tomorrow"}
            live={tomorrow}
            type={"For Tomorrow"}
          />
        )}
        {Object.keys(yesterday).length === 0 && <Empty_live_now />}
        {Object.keys(yesterday).length !== 0 && (
          <Fixtures_game
            id={"yesterday"}
            live={yesterday}
            type={"Was Yesterday"}
          />
        )}
      </div>
    </div>
  );
}

export default Main_fixtures;
