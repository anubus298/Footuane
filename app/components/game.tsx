"use client";
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { statusShorts } from "../lib/api/ids";
import { FixturesData } from "../lib/types/fixture";

interface CompProps {
  fixture: FixturesData;
  type: string;
}
function Game(props: CompProps) {
  const date = new Date(props.fixture.fixture.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });

  return (
    <div className="w-full rounded-md p-3 items-center gap-2 select-none ">
      <p className="font-semibold text-sm w-full ">{formattedDate}</p>
      <div className="items-center p-2 bg-white rounded-lg gap-2 flex w-full justify-between h-[70px]">
        <div className="flex items-center gap-3 justify-start ">
          <p className="w-[80px]">{props.fixture.teams.away.name}</p>
          <div className="w-[35px]">
            <Image
              alt={props.fixture.teams.away.name + " logo"}
              src={props.fixture.teams.away.logo}
              height={35}
              width={35}
              className="h-auto w-auto"
            />
          </div>
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
            <div className="flex items-center gap-1">
              <p className=" font-semibold">
                {props.fixture.fixture.status.elapsed}&apos;
              </p>
              <FontAwesomeIcon icon={faSoccerBall} bounce className="text-sm" />
            </div>
          )}
          {/*if finished show ago*/}
          {(statusShorts.finished + statusShorts.scheduled).includes(
            props.fixture.fixture.status.short
          ) && <p>{getPrettyDate(props.fixture.fixture.date)}</p>}
        </div>
        <div className="flex items-center gap-3 justify-end">
          <div className="w-[35px]">
            <Image
              alt={props.fixture.teams.away.name + " logo"}
              src={props.fixture.teams.home.logo}
              height={35}
              width={35}
              className="h-auto"
            />
          </div>
          <p className="w-[80px]">{props.fixture.teams.home.name}</p>
        </div>
        <div className="">
          <Image
            alt={props.fixture.league.name}
            src={props.fixture.league.logo}
            height={35}
            width={35}
            className="h-auto"
          />
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
