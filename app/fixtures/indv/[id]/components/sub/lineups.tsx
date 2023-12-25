"use client";
import { TeamFormation } from "@/app/lib/types/fixture/fixtureIndv";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FieldPitch from "./field";
interface Props {
  lineups: TeamFormation[];
  homeColor: Color;
  homeGoalKeeperColor: Color;
  awayColor: Color;
  awayGoalKeeperColor: Color;
}
interface Color {
  primary: string;
  number: string;
  border: string;
}

function Lineups({
  lineups,
  homeColor,
  homeGoalKeeperColor,
  awayGoalKeeperColor,
  awayColor,
}: Props) {
  const [HomeList] = useState<Mimic[][]>(
    makingFormation(lineups[0], homeColor, homeGoalKeeperColor, true)
  );
  const [AwayList] = useState<Mimic[][]>(
    makingFormation(lineups[1], awayColor, awayGoalKeeperColor, false)
  );

  const positionColors: Record<string, string> = {
    G: "#ff9800",
    D: "#55d3de",
    M: "#74dc2e",
    F: "#ff3737",
  };
  const [HomecurrentDisplayedFormation, setHomecurrentDisplayedFormation] =
    useState(lineups[0]?.startXI);
  const [AwaycurrentDisplayedFormation, setAwaycurrentDisplayedFormation] =
    useState(lineups[1]?.startXI);
  return (
    <div className="flex flex-col gap-1 px-2 pt-4 text-sm font-light text-white bg-opacity-40 rounded-tr-md bg-primary-first md:text-base">
      <div className="flex justify-center col-span-4 pb-3 font-medium">
        <p className="text-lg text-center text-primary-second">Teams Composition</p>
      </div>
      <div className="grid grid-cols-4 col-span-4 ">
        <ul className="flex flex-col col-span-2 gap-2 p-2 overflow-hidden pe-2">
          <li className="flex items-center gap-2 font-medium text-start">
            <Image
              src={lineups[0]?.team.logo}
              height={20}
              width={20}
              alt={lineups[0]?.team.name + " logo"}
            />
            <p className="text-sm">{lineups[0]?.team.name}</p>
            <p className="text-sm">{lineups[0]?.formation}</p>
          </li>
          {HomecurrentDisplayedFormation.map((player) => {
            return (
              <li
                key={player.player.id}
                className="flex items-center justify-between w-full text-end "
              >
                <div className="flex items-center gap-x-1">
                  <p className="w-[20px] flex justify-center font-semibold">
                    {player.player.number}
                  </p>
                  <Link href={"/players/" + player.player.id}>
                    {player.player.name}
                  </Link>
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
            className="text-sm cursor-pointer text-primary-second text-end"
            onClick={() => {
              lineups[0]?.substitutes == HomecurrentDisplayedFormation
                ? setHomecurrentDisplayedFormation(lineups[0]?.startXI)
                : setHomecurrentDisplayedFormation(lineups[0]?.substitutes);
            }}
          >
            {lineups[0]?.substitutes == HomecurrentDisplayedFormation
              ? "view starting"
              : "view substitutes"}
          </li>
        </ul>
        <ul className="flex flex-col col-span-2 gap-2 p-2 overflow-hidden text-end">
          <li className="flex items-center gap-2 font-medium text-start">
            <Image
              src={lineups[1]?.team.logo}
              height={20}
              width={20}
              alt={lineups[1]?.team.name + " logo"}
            />
            <p className="text-sm">{lineups[1]?.team.name}</p>
            <p className="text-sm">{lineups[1]?.formation}</p>
          </li>

          {AwaycurrentDisplayedFormation.map((player) => {
            return (
              <li
                key={player.player.id}
                className="flex items-center justify-between w-full text-end"
              >
                <div className="flex items-center gap-x-1">
                  <p className="w-[20px] flex justify-center font-semibold">
                    {player.player.number}
                  </p>
                  <Link href={"/players/" + player.player.id}>
                    {player.player.name}
                  </Link>
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
            className="self-end text-sm cursor-pointer text-primary-second text-end place-self-end justify-self-end"
            onClick={() => {
              lineups[1]?.substitutes == AwaycurrentDisplayedFormation
                ? setAwaycurrentDisplayedFormation(lineups[1]?.startXI)
                : setAwaycurrentDisplayedFormation(lineups[1]?.substitutes);
            }}
          >
            {lineups[1]?.substitutes == AwaycurrentDisplayedFormation
              ? "view starting"
              : "view substitutes"}
          </li>
        </ul>
      </div>
      <FieldPitch list={HomeList} lineup={lineups[0]} isHome={true} />
      <FieldPitch list={AwayList} lineup={lineups[1]} isHome={false} />
    </div>
  );
}

export default Lineups;

export interface Mimic {
  name: string;
  id: number;
  node: React.ReactNode;
}
function makingFormation(
  lineup: TeamFormation,
  color: Color,
  keeperColor: Color,
  reverse: boolean
) {
  let mimic: Mimic[][] = [];
  lineup.startXI.forEach((player, index) => {
    const gridValue = parseInt(player.player.grid[0], 10);
    const gridIndex = (isNaN(gridValue) ? 0 : gridValue) || 0;

    if (mimic[gridIndex]) {
      mimic[gridIndex].push({
        name: player.player.name,
        id: player.player.id,
        node: (
          <div
            className="relative flex items-center justify-center"
            key={player.player.id + 4}
          >
            <div
              className="relative flex items-center justify-center"
              key={player.player.id + 4}
            >
              <FontAwesomeIcon
                icon={faShirt}
                size="2x"
                style={{
                  color:
                    "#" + (index == 0 ? keeperColor.primary : color.primary),
                  stroke:
                    "#" + (index == 0 ? keeperColor.border : color.border),
                  strokeWidth: "20px",
                }}
                className=""
              />
              <p
                className="absolute font-semibold -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                style={{
                  color: "#" + color.number,
                }}
              >
                {player.player.number}
              </p>
            </div>
          </div>
        ),
      });
    } else {
      mimic[gridIndex] = [
        {
          name: player.player.name,
          id: player.player.id,
          node: (
            <div
              className="relative flex items-center justify-center"
              key={player.player.id + 4}
            >
              <div
                className="relative flex items-center justify-center"
                key={player.player.id + 4}
              >
                <FontAwesomeIcon
                  icon={faShirt}
                  size="2x"
                  style={{
                    color:
                      "#" + (index == 0 ? keeperColor.primary : color.primary),
                    stroke:
                      "#" + (index == 0 ? keeperColor.border : color.border),
                    strokeWidth: "20px",
                  }}
                  className=""
                />
                <p
                  className="absolute font-semibold -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  style={{
                    color:
                      "#" + (index == 0 ? keeperColor.number : color.number),
                  }}
                >
                  {player.player.number}
                </p>
              </div>
            </div>
          ),
        },
      ];
    }
  });
  if (reverse) {
    return mimic;
  } else {
    return mimic.reverse();
  }
}
