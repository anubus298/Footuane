"use client";

import { LiveLeagues } from "../page";
import Empty_live_now from "./empty/empty_live";
import Live_Now from "./live";

interface Props {
  live: LiveLeagues;
}
function Main_fixtures({ live }: Props) {
  return (
    <div className="grid grid-cols-12 text-white gap-1">
      {Object.keys(live).length !== 0 && <Live_Now live={live} />}
      {Object.keys(live).length === 0 && <Empty_live_now />}
    </div>
  );
}

export default Main_fixtures;
