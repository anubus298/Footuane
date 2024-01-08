"use client";

import { sortedFixturesByleague } from "../page";
import Empty_live_now from "./empty/empty_live";
import Fixtures_game from "./live";

interface Props {
  live: sortedFixturesByleague;
  tomorrow: sortedFixturesByleague;
  yesterday: sortedFixturesByleague;
}
function Main_fixtures({ live, tomorrow, yesterday }: Props) {
  return (
    <div className="grid grid-cols-12 gap-1 text-white">
      {Object.keys(live).length !== 0 && (
        <Fixtures_game live={live} type={"Live Now"} />
      )}
      {Object.keys(tomorrow).length === 0 && <Empty_live_now />}
      {Object.keys(tomorrow).length !== 0 && (
        <Fixtures_game live={tomorrow} type={"For Tomorrow"} />
      )}
      {Object.keys(yesterday).length === 0 && <Empty_live_now />}
      {Object.keys(yesterday).length !== 0 && (
        <Fixtures_game live={yesterday} type={"For Tomorrow"} />
      )}
    </div>
  );
}

export default Main_fixtures;
