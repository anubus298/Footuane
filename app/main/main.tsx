"use client";
import Image from "next/image";
import Games_table from "../components/games_table";
import { fixtureResponse } from "../lib/types/fixture";
interface Props {
  fixtures_sl: fixtureResponse;
  fixtures_pl: fixtureResponse;
  live: fixtureResponse;
  test?: any;
}

function Main(props: Props) {
  return (
    <div className="w-full">
      <Image
        src={"/1280cover.png"}
        quality={100}
        alt="main cover of the page"
        className="h-auto"
        width={1280}
        height={720}
      />
      <Games_table
        fixtures={props.live.response}
        type="La Liga"
      />
      <Games_table fixtures={props.fixtures_sl.response} type="La Liga" />
    </div>
  );
}

export default Main;
