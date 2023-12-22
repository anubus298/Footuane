import { TeamFormation } from "@/app/lib/types/fixture/fixtureIndv";
import Image from "next/image";
import { useState } from "react";

function Lineups({ lineups }: { lineups: TeamFormation[] }) {
  const positionColors: Record<string, string> = {
    G: "#ff9800",
    D: "#55d3de",
    M: "#74dc2e",
    F: "#ff3737",
  };
  const [HomecurrentDisplayedFormation, setHomecurrentDisplayedFormation] =
    useState(lineups[0].startXI);
  const [AwaycurrentDisplayedFormation, setAwaycurrentDisplayedFormation] =
    useState(lineups[1].startXI);
  return (
    <div className="bg-primary-first bg-opacity-50 text-white pt-4 px-2 font-light text-sm md:text-base h-full">
      <div className="col-span-4  flex justify-center pb-3 font-medium">
        <p>Teams Composition</p>
      </div>
      <div className="col-span-4 h-full grid grid-rows-1 grid-cols-4 ">
        <ul className="gap-2 row-span-1 p-2 flex flex-col col-span-2 pe-2  overflow-hidden">
          <li className="font-medium text-start flex items-center gap-2">
            <Image
              src={lineups[0].team.logo}
              height={20}
              width={20}
              alt={lineups[0].team.name + " logo"}
            />
            <p>{lineups[0].team.name}</p>
          </li>
          {HomecurrentDisplayedFormation.map((player) => {
            return (
              <li
                key={player.player.id}
                className="flex justify-between items-center w-full text-end "
              >
                <div className="flex gap-x-1 items-center">
                  <p className="w-[20px] flex justify-center font-semibold">
                    {player.player.number}
                  </p>
                  <p> {player.player.name}</p>
                </div>
                <div
                  style={{ color: positionColors[player.player.pos] }}
                  className="font-semibold"
                >
                  <p>{player.player.pos}</p>
                </div>
              </li>
            );
          })}
          <li
            className="text-primary-second text-sm text-end cursor-pointer"
            onClick={() => {
              lineups[0].substitutes == HomecurrentDisplayedFormation
                ? setHomecurrentDisplayedFormation(lineups[0].startXI)
                : setHomecurrentDisplayedFormation(lineups[0].substitutes);
            }}
          >
            {lineups[0].substitutes == HomecurrentDisplayedFormation
              ? "view starting"
              : "view substitutes"}
          </li>
        </ul>
        <ul className="gap-2 row-span-1 p-2 flex flex-col col-span-2 text-end overflow-hidden">
          <li className="font-medium text-start  flex items-center gap-2">
            <Image
              src={lineups[1].team.logo}
              height={20}
              width={20}
              alt={lineups[1].team.name + " logo"}
            />
            <p>{lineups[1].team.name}</p>
          </li>

          {AwaycurrentDisplayedFormation.map((player) => {
            return (
              <li
                key={player.player.id}
                className="flex justify-between items-center w-full text-end"
              >
                <div className="flex gap-x-1 items-center">
                  <p className="w-[20px] flex justify-center font-semibold">
                    {player.player.number}
                  </p>
                  <p> {player.player.name}</p>
                </div>
                <div
                  style={{ color: positionColors[player.player.pos] }}
                  className="font-semibold"
                >
                  <p>{player.player.pos}</p>
                </div>
              </li>
            );
          })}
          <li
            className="text-primary-second text-sm text-end cursor-pointer self-end place-self-end justify-self-end"
            onClick={() => {
              lineups[1].substitutes == AwaycurrentDisplayedFormation
                ? setAwaycurrentDisplayedFormation(lineups[1].startXI)
                : setAwaycurrentDisplayedFormation(lineups[1].substitutes);
            }}
          >
            {lineups[1].substitutes == AwaycurrentDisplayedFormation
              ? "view starting"
              : "view substitutes"}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lineups;
