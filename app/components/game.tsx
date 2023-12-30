/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { statusShorts } from "../lib/api/ids";
import { FixtureData } from "../lib/types/fixture/fixture";

interface CompProps {
  fixture: FixtureData;
  showLeague: boolean;
}
function Game(props: CompProps) {
  const [elapsed, setelapsed] = useState(
    props.fixture?.fixture?.status?.elapsed
  );
  const [formattedDate, setformattedDate] = useState("");
  const router = useRouter();
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
  }, []);

  useEffect(() => {
    const date = new Date(props.fixture.fixture.date);
    setformattedDate(
      date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      })
    );
  }, []);

  return (
    <div className="items-center w-full gap-2 p-3 select-none">
      <p className="text-sm font-semibold ">{formattedDate}</p>
      <div className="items-center py-2 px-1 md:px-4 rounded-sm bg-primary-first bg-opacity-30 flex w-full h-[100px] md:h-[70px]">
        <div
          className={
            "flex items-center *:w-1/3 " +
            (props.showLeague ? "w-10/12" : "w-full")
          }
        >
          <div className="flex flex-col items-center justify-start gap-3 md:flex-row">
            <div
              className="w-[35px]  cursor-pointer hover:-translate-y-1 transition"
              onClick={() =>
                router.push(`teams/indv/${props.fixture.teams.home.id}`)
              }
            >
              <Image
                unoptimized
                alt={props.fixture.teams.home.name + " logo"}
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
          <div
            onClick={() =>
              router.push(`/fixtures/indv/${props.fixture.fixture.id}`)
            }
            className="flex flex-col items-center gap-2 transition rounded-sm cursor-pointer hover:bg-primary-second hover:bg-opacity-5"
          >
            <div className="flex items-center gap-2">
              <p
                className={
                  "font-normal " +
                  (props.fixture.goals.home > props.fixture.goals.away
                    ? ""
                    : props.fixture.goals.home === props.fixture.goals.away
                    ? ""
                    : "text-gray-500")
                }
              >
                {props.fixture.goals.home ?? "-"}
              </p>
              <p
                className={
                  "font-normal " +
                  (props.fixture.goals.away > props.fixture.goals.home
                    ? ""
                    : props.fixture.goals.home === props.fixture.goals.away
                    ? ""
                    : "text-gray-500")
                }
              >
                {props.fixture.goals.away ?? "-"}
              </p>
            </div>
            {/*if in_play show current time */}
            {statusShorts.in_play.includes(
              props.fixture.fixture.status.short
            ) && (
              <div className="flex items-center gap-1 text-primary-second">
                <p className="font-normal ">{elapsed}&apos;</p>
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
              <p className="font-normal">
                {getPrettyDate(props.fixture.fixture.date)}
              </p>
            )}
            {statusShorts.first_half === props.fixture.fixture.status.short && (
              <p className="font-normal">First Half</p>
            )}
            {statusShorts.penalty === props.fixture.fixture.status.short && (
              <p className="font-normal">Penalty in Progress</p>
            )}
          </div>

          <div className="flex flex-col items-center justify-end gap-3 md:flex-row ">
            <p className="w-[50px] text-xs md:text-base text-center md:text-end  md:w-[80px]">
              {props.fixture.teams.away.name}
            </p>
            <div
              className="w-[35px] cursor-pointer hover:-translate-y-1 transition"
              onClick={() =>
                router.push(`teams/indv/${props.fixture.teams.away.id}`)
              }
            >
              <Image
                unoptimized
                alt={props.fixture.teams.away.name + " logo"}
                src={props.fixture.teams.away.logo}
                height={35}
                width={35}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>
        {props.showLeague && (
          <div className="flex justify-end w-2/12">
            <div className=" size-[45px] bg-white rounded-sm  overflow-hidden flex place-center p-1">
              <Image
                onClick={() =>
                  router.push(`/leagues/indv/${props.fixture.league.id}`)
                }
                alt={
                  props.fixture.league.name +
                  " logo: " +
                  props.fixture.league.country
                }
                src={props.fixture.league.logo}
                height={35}
                width={35}
                className="h-auto transition cursor-pointer hover:-translate-y-1 "
              />
            </div>
          </div>
        )}
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
    if (absDiffInSeconds >= 31536000) {
      const diffInYears = Math.floor(absDiffInSeconds / 31536000);
      return new Intl.RelativeTimeFormat("en").format(diffInYears, "year");
    } else if (absDiffInSeconds >= 2592000) {
      const diffInMonths = Math.floor(absDiffInSeconds / 2592000);
      return new Intl.RelativeTimeFormat("en").format(diffInMonths, "month");
    } else if (absDiffInSeconds >= 86400) {
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
    if (absDiffInSeconds >= 31536000) {
      const diffInYears = Math.floor(absDiffInSeconds / 31536000);
      return new Intl.RelativeTimeFormat("en").format(-diffInYears, "year");
    } else if (absDiffInSeconds >= 2592000) {
      const diffInMonths = Math.floor(absDiffInSeconds / 2592000);
      return new Intl.RelativeTimeFormat("en").format(-diffInMonths, "month");
    } else if (absDiffInSeconds >= 86400) {
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
