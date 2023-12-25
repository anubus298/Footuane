"use client";
import { Players, TeamStatistics } from "@/app/lib/types/fixture/fixtureIndv";
import { useMediaQuery } from "react-responsive";
import { Popover } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  statistics: TeamStatistics[];
  homeColor: string;
  awayColor: string;
  players: Players[];
}

function Statistics({ statistics, awayColor, homeColor, players }: Props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });

  const validTypes = [
    "Shots on Goal",
    "Shots off Goal",
    "Total Shots",
    "Fouls",
    "Corner Kicks",
    "Offsides",
    "Ball Possession",
    "Total passes",
    "Passes accurate",
  ];

  const widthReference = useRef<HTMLDivElement | null>(null);
  const [HomeTeamStatistics, setHomeTeamStatistics] =
    useState<React.ReactNode>();
  const [AwayTeamStatistics, setAwayTeamStatistics] =
    useState<React.ReactNode>();
  const MiddleText = validTypes.map((item, index) => {
    return (
      <p key={index * 4 + 5168} className="flex items-center justify-center">
        {item}
      </p>
    );
  });

  useEffect(() => {
    const width = widthReference.current;
    setHomeTeamStatistics(
      validTypes.map((item, index) => {
        if (item !== "Ball Possession") {
          return (
            <div
              key={index * 4 + 5468}
              className="flex items-center justify-between "
            >
              <p>
                {(statistics[0].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
              <div
                className="h-2 text-xs opacity-50 rounded-s-lg md:text-base md:h-2"
                style={{
                  backgroundColor: "#" + homeColor,
                  width:
                    (((statistics[0].statistics.find((key) => {
                      return item === key.type;
                    })?.value as number) || 0) /
                      ((statistics[1].statistics.find((key) => {
                        return item === key.type;
                      })?.value as number) +
                        (statistics[0].statistics.find((key) => {
                          return item === key.type;
                        })?.value as number) || 0)) *
                      (((width?.clientWidth as number) || 0) -
                        (isMobileScreen ? 30 : 25)) +
                    1 +
                    "px",
                }}
              ></div>
            </div>
          );
        } else {
          return (
            <div
              key={index * 4 + 5468}
              className="flex items-center justify-between "
            >
              <p>
                {(statistics[0].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
              <div
                className="h-2 text-xs opacity-50 rounded-s-lg md:text-base md:h-2"
                style={{
                  backgroundColor: "#" + homeColor,
                  width:
                    (parseFloat(
                      (
                        (statistics[0].statistics.find((key) => {
                          return "Ball Possession" === key.type;
                        })?.value as string) || "0%"
                      ).replace(/%/g, "")
                    ) /
                      100) *
                      (((width?.clientWidth as number) || 0) -
                        (isMobileScreen ? 30 : 25)) +
                    1 +
                    "px",
                }}
              ></div>
            </div>
          );
        }
      })
    );
    setAwayTeamStatistics(
      validTypes.map((item, index) => {
        if (item !== "Ball Possession") {
          return (
            <div
              key={index * 4 + 5469}
              className="flex items-center justify-between"
            >
              <div
                className="h-2 text-xs opacity-50 rounded-e-lg md:text-base md:h-2"
                style={{
                  backgroundColor: "#" + awayColor,
                  width:
                    (((statistics[1].statistics.find((key) => {
                      return item === key.type;
                    })?.value as number) || 0) /
                      ((statistics[0].statistics.find((key) => {
                        return item === key.type;
                      })?.value as number) +
                        (statistics[1].statistics.find((key) => {
                          return item === key.type;
                        })?.value as number) || 0)) *
                      (((width?.clientWidth as number) || 0) -
                        (isMobileScreen ? 30 : 25)) +
                    1 +
                    "px",
                }}
              ></div>
              <p>
                {(statistics[1].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
            </div>
          );
        } else {
          return (
            <div
              key={index * 4 + 5468}
              className="flex items-center justify-between "
            >
              <div
                className="h-2 text-xs opacity-50 rounded-e-lg md:text-base md:h-2"
                style={{
                  backgroundColor: "#" + awayColor,
                  width:
                    (parseFloat(
                      (
                        (statistics[1].statistics.find((key) => {
                          return "Ball Possession" === key.type;
                        })?.value as string) || "0%"
                      ).replace(/%/g, "")
                    ) /
                      100) *
                      (((width?.clientWidth as number) || 0) -
                        (isMobileScreen ? 30 : 25)) +
                    1 +
                    "px",
                }}
              ></div>
              <p>
                {(statistics[1].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
            </div>
          );
        }
      })
    );
  }, []);
  return (
    <div className="p-2 py-4 text-white bg-opacity-40 select-none bg-primary-first">
      <h3 className="mb-2 text-2xl font-semibold text-center text-primary-second">
        Statistics{" "}
      </h3>
      <div className="grid w-full grid-cols-9 grid-rows-1 md:grid-cols-12 ">
        <div
          className="col-span-3 md:col-span-5 flex flex-col *:h-3 text-xs md:text-base *:md:h-5 gap-4 row-span-1"
          ref={widthReference}
        >
          <div className="flex items-center justify-end w-full gap-4">
            {players[0]?.players && (
              <>
                <Popover
                  trigger={isMobileScreen ? "click" : "hover"}
                  content={players[0].players
                    .filter((player) => player.statistics[0].cards.red !== 0)
                    .map((player) => {
                      return (
                        <div
                          key={player.player.id + 452}
                          className="flex items-center gap-2"
                        >
                          <div className="mt-1 bg-red-600 card"></div>
                          <Link href={"/players/" + player.player.id}>
                            {player.player.name}
                          </Link>
                        </div>
                      );
                    })}
                  className="cursor-pointer"
                >
                  <div className="bg-red-600 card">
                    {(statistics[0].statistics.find((key) => {
                      return "Red Cards" === key.type;
                    })?.value as number) || 0}
                  </div>
                </Popover>
                <Popover
                  trigger={isMobileScreen ? "click" : "hover"}
                  content={players[0].players
                    .filter((player) => player.statistics[0].cards.yellow !== 0)
                    .map((player) => {
                      return (
                        <div
                          key={player.player.id + 452}
                          className="flex items-center gap-2"
                        >
                          <div className="mt-1 bg-yellow-400 card"></div>
                          <Link href={"/players/" + player.player.id}>
                            {player.player.name}
                          </Link>
                        </div>
                      );
                    })}
                  className="cursor-pointer"
                >
                  <div className="text-black bg-yellow-400 card">
                    {(statistics[0].statistics.find((key) => {
                      return "Yellow Cards" === key.type;
                    })?.value as number) || 0}
                  </div>
                </Popover>
              </>
            )}
          </div>
          {HomeTeamStatistics}
        </div>
        <div className="col-span-3 md:col-span-2 flex flex-col text-center *:h-3 text-xs md:text-base *:md:h-5 gap-4 row-span-1">
          <div className="flex flex-col col-span-2 row-span-1">Cards</div>
          {MiddleText}
        </div>
        <div className="col-span-3 md:col-span-5 flex flex-col gap-4 row-span-1 *:h-3 text-xs md:text-base *:md:h-5">
          <div className="flex items-center gap-4">
            {players[1]?.players && (
              <>
                <Popover
                  content={players[1].players
                    .filter((player) => player.statistics[0].cards.yellow !== 0)
                    .map((player) => {
                      return (
                        <div
                          key={player.player.id + 452}
                          className="flex items-center gap-2"
                        >
                          <div className="mt-1 bg-yellow-400 card"></div>
                          <Link href={"/players/" + player.player.id}>
                            {player.player.name}
                          </Link>
                        </div>
                      );
                    })}
                  className="cursor-pointer"
                >
                  <div className="text-black bg-yellow-400 card">
                    {(statistics[1].statistics.find((key) => {
                      return "Yellow Cards" === key.type;
                    })?.value as number) || 0}
                  </div>
                </Popover>
                <Popover
                  content={players[1].players
                    .filter((player) => player.statistics[0].cards.red !== 0)
                    .map((player) => {
                      return (
                        <div
                          key={player.player.id + 452}
                          className="flex items-center gap-2"
                        >
                          <div className="mt-1 bg-red-600 card"></div>
                          <Link href={"/players/" + player.player.id}>
                            {player.player.name}
                          </Link>
                        </div>
                      );
                    })}
                  className="cursor-pointer"
                >
                  <div className="bg-red-600 card">
                    {(statistics[1].statistics.find((key) => {
                      return "Red Cards" === key.type;
                    })?.value as number) || 0}
                  </div>
                </Popover>
              </>
            )}
          </div>
          {AwayTeamStatistics}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
