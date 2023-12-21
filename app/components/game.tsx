"use client";
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { statusShorts } from "../lib/api/ids";
import { FixturesData } from "../lib/types/fixture";

interface CompProps {
  fixture: FixturesData;
  type: string;
}
function Game(props: CompProps) {
  const [elapsed, setelapsed] = useState(
    props.fixture?.fixture?.status?.elapsed
  );
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (elapsed) {
      intervalId = setInterval(() => {
        setelapsed((prevElapsed) => prevElapsed + 1);
      }, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [elapsed]); // Include elapsed as a dependency

  const date = new Date(props.fixture.fixture.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return (
    <div className="w-full p-3 items-center gap-2 select-none ">
      <p className="font-semibold text-sm w-full ">{formattedDate}</p>
      <div className="items-center py-2 px-1 md:px-4 bg-[#313131] bg-opacity-50 flex w-full h-[100px] md:h-[70px]">
        <div className="w-10/12 flex items-center *:w-1/3">
          <div className="flex-col md:flex-row flex items-center  gap-3 justify-start ">
            <div className="w-[35px]">
              <Image
                alt={props.fixture.teams.away.name + " logo"}
                src={props.fixture.teams.away.logo}
                height={35}
                width={35}
                className="h-auto w-auto"
              />
            </div>{" "}
            <p className="w-[50px] text-xs md:text-base text-center md:text-start  md:w-[80px]">
              {props.fixture.teams.away.name}
            </p>
          </div>
          <div className="flex-col flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p
                className={
                  props.fixture.goals.away > props.fixture.goals.home
                    ? ""
                    : props.fixture.goals.home === props.fixture.goals.away
                    ? ""
                    : "text-gray-500"
                }
              >
                {props.fixture.goals.away ?? "-"}
              </p>
              <p
                className={
                  props.fixture.goals.home > props.fixture.goals.away
                    ? ""
                    : props.fixture.goals.home === props.fixture.goals.away
                    ? ""
                    : "text-gray-500"
                }
              >
                {props.fixture.goals.home ?? "-"}
              </p>
            </div>
            {/*if in_play show current time*/}
            {statusShorts.in_play.includes(
              props.fixture.fixture.status.short
            ) && (
              <div className="flex items-center gap-1 text-primary-second">
                <p className=" font-semibold">{elapsed}&apos;</p>
                <FontAwesomeIcon
                  icon={faSoccerBall}
                  bounce
                  className="text-sm"
                />
              </div>
            )}
            {/*if finished show ago*/}
            {(statusShorts.finished + "-" + statusShorts.scheduled)
              .split("-")
              .includes(props.fixture.fixture.status.short) && (
              <p>{getPrettyDate(props.fixture.fixture.date)}</p>
            )}
            {statusShorts.first_half === props.fixture.fixture.status.short && (
              <p>First Half</p>
            )}
            {statusShorts.penalty === props.fixture.fixture.status.short && (
              <p>Penalty in Progress</p>
            )}
          </div>
          <div className="flex-col md:flex-row flex items-center  gap-3 justify-end">
            <div className="w-[35px]">
              <Image
                alt={props.fixture.teams.away.name + " logo"}
                src={props.fixture.teams.home.logo}
                height={35}
                width={35}
                className="h-auto"
              />
            </div>
            <p className="w-[50px] text-xs md:text-base text-center md:text-start md:w-[80px]">
              {props.fixture.teams.home.name}
            </p>
          </div>
        </div>
        <div className="w-2/12 flex justify-end">
          <div className=" size-[45px] bg-white bg-opacity-15 rounded-2xl  overflow-hidden flex place-center p-1">
            <Image
              alt={
                props.fixture.league.name +
                " logo: " +
                props.fixture.league.country
              }
              src={props.fixture.league.logo}
              height={35}
              width={35}
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getPrettyDate(date: string): string {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const now: number = targetDate.getTime() - currentDate.getTime();

  // Calculate the absolute difference in seconds
  const absDiffInSeconds = Math.abs(now / 1000);

  if (now > 0) {
    // Future date
    if (absDiffInSeconds >= 86400) {
      const diffInDays = Math.floor(absDiffInSeconds / 86400);
      return new Intl.RelativeTimeFormat("en").format(diffInDays, "day");
    } else if (absDiffInSeconds >= 3600) {
      const diffInHours = Math.floor(absDiffInSeconds / 3600);
      return new Intl.RelativeTimeFormat("en").format(diffInHours, "hour");
    } else {
      const diffInMinutes = Math.floor(absDiffInSeconds / 60);
      return new Intl.RelativeTimeFormat("en").format(diffInMinutes, "minute");
    }
  } else if (now < 0) {
    // Past date
    if (absDiffInSeconds >= 86400) {
      const diffInDays = Math.floor(absDiffInSeconds / 86400);
      return new Intl.RelativeTimeFormat("en").format(-diffInDays, "day");
    } else if (absDiffInSeconds >= 3600) {
      const diffInHours = Math.floor(absDiffInSeconds / 3600);
      return new Intl.RelativeTimeFormat("en").format(-diffInHours, "hour");
    } else {
      const diffInMinutes = Math.floor(absDiffInSeconds / 60);
      return new Intl.RelativeTimeFormat("en").format(-diffInMinutes, "minute");
    }
  } else {
    // Same date
    return "Now";
  }
}

export default Game;
