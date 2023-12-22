import { TeamStatistics } from "@/app/lib/types/fixture/fixtureIndv";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  statistics: TeamStatistics[];
  homeColor: string;
  awayColor: string;
}

function Statistics({ statistics, awayColor, homeColor }: Props) {
  const validTypes = [
    "Shots on Goal",
    "Shots off Goal",
    "Total Shots",
    "Fouls",
    "Corner Kicks",
    "Offsides",
    "Ball Possession",
    "Total passes",
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
              className="flex justify-between items-center "
            >
              <p>
                {(statistics[0].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
              <div
                className=" h-3 text-xs md:text-base md:h-2  opacity-50"
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
                      (((width?.clientWidth as number) || 0) - 25) +
                    "px",
                }}
              ></div>
            </div>
          );
        } else {
          return (
            <div
              key={index * 4 + 5468}
              className="flex justify-between  items-center "
            >
              <p>
                {(statistics[0].statistics.find((key) => {
                  return item === key.type;
                })?.value as number) || 0}
              </p>
              <div
                className=" h-3 text-xs md:text-base md:h-2  opacity-50"
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
                      (((width?.clientWidth as number) || 0) - 25) +
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
                className=" h-3 text-xs md:text-base md:h-2  opacity-50"
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
                      (((width?.clientWidth as number) || 0) - 25) +
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
              className="flex justify-between  items-center "
            >
              <div
                className=" h-3 text-xs md:text-base md:h-2  opacity-50"
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
                      (((width?.clientWidth as number) || 0) - 25) +
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
    <div className="w-full bg-primary-first bg-opacity-50 text-white grid-cols-12 grid p-2 py-4">
      <div
        ref={widthReference}
        className="col-span-5 flex flex-col *:h-3 text-xs md:text-base *:md:h-5 gap-4"
      >
        {HomeTeamStatistics}
      </div>
      <div className="col-span-2 flex flex-col text-center *:h-3 text-xs md:text-base *:md:h-5 gap-4">
        {MiddleText}
      </div>
      <div className="col-span-5 flex flex-col gap-4 *:h-3 text-xs md:text-base *:md:h-5">
        {AwayTeamStatistics}
      </div>
    </div>
  );
}

export default Statistics;
